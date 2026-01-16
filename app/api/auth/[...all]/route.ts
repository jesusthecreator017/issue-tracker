import { auth } from "@/app/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import arcjet, { detectBot, protectSignup, shield, slidingWindow } from "@arcjet/next";
import type { BotOptions, EmailOptions, SlidingWindowRateLimitOptions } from "@arcjet/next";
import { findIp } from "@arcjet/ip";
import { NextRequest } from "next/server";

const aj = arcjet({
    key: process.env.ARCJET_KEY!,
    characteristics: ['userIdOrIp'],
    rules: [shield({ mode: 'LIVE' })],
    log: console,
});

const botSettings: BotOptions = { mode: 'LIVE', allow: [] };

const restrictiveRateLimitSettings: SlidingWindowRateLimitOptions<[]> = {
    mode: 'LIVE',
    max: 10,
    interval: '10m'
};

const laxRateLimitSettings: SlidingWindowRateLimitOptions<[]> = {
    mode: 'LIVE',
    max: 60,
    interval: '1m'
};

const emailSettings: EmailOptions = {
    mode: 'LIVE',
    deny: ['DISPOSABLE', 'INVALID', 'NO_MX_RECORDS']
};

const authHandlers = toNextJsHandler(auth);
export const { GET } = authHandlers;

export async function POST(request: NextRequest) {
    const clonedRequest = request.clone();
    const decision = await checkArcJet(request);
    if(decision.isDenied()){
        if(decision.reason.isRateLimit()){
            return new Response('Too many requests', { status: 429 });
        } else if(decision.reason.isEmail()){
            let message: string
            if(decision.reason.emailTypes.includes('INVALID')){
                message = 'Email address format is invalid';
            } else if(decision.reason.emailTypes.includes('DISPOSABLE')){
                message = 'Disposable email addresses are not allowed';
            } else if(decision.reason.emailTypes.includes('NO_MX_RECORDS')){
                message = 'Email domain has no MX records';
            } else {
                message = 'Email address is not allowed';
            }

            return Response.json( { error: message }, { status: 400 } );
        }
        return new Response(null, { status: 403 });
    }

    return authHandlers.POST(clonedRequest);
}

async function checkArcJet(request: NextRequest) {
    const body = (await request.json()) as unknown;
    const session = await auth.api.getSession({ headers: request.headers });
    const userIdOrIp = (session?.user.id ?? findIp(request)) || "127.0.0.1";

    if (request.url.endsWith('/auth/sign-up')) {
        // Signing in with an email
        if (body && typeof body === 'object' && 'email' in body && typeof body.email === 'string') {
            return aj.withRule(protectSignup({ email: emailSettings, bots: botSettings, rateLimit: restrictiveRateLimitSettings })).protect(request, { email: body.email, userIdOrIp })
        } else {
            return aj.withRule(detectBot(botSettings)).withRule(slidingWindow(restrictiveRateLimitSettings)).protect(request, { userIdOrIp });
        }
    }

    return aj.withRule(detectBot(botSettings)).withRule(slidingWindow(laxRateLimitSettings)).protect(request, { userIdOrIp });
}
