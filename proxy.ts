import { NextRequest, NextResponse } from "next/server";

// Routes that require authentication
const protectedRoutes = [
    '/issues/list',
    '/issues/list/new',
    '/issues/list/edit',
];

// API routes that require authentication (for non-GET requests)
const protectedApiRoutes = [
    //'',
    '/api/issues',
];

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if this is a protected page route
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    // Check if this is a protected API route (POST, PATCH, DELETE)
    const isProtectedApiRoute = protectedApiRoutes.some(route =>
        pathname.startsWith(route)
    ) && request.method !== 'GET';

    if (isProtectedRoute || isProtectedApiRoute) {
        // Check for BetterAuth session cookie
        // BetterAuth uses 'better-auth.session_token' cookie by default
        const sessionCookie = request.cookies.get('better-auth.session_token');

        if (!sessionCookie) {
            // For API routes, return 401
            if (isProtectedApiRoute) {
                return NextResponse.json(
                    { error: 'Unauthorized. Please sign in to perform this action.' },
                    { status: 401 }
                );
            }

            // For page routes, redirect to sign-in
            const signInUrl = new URL('/auth/signup', request.url);
            signInUrl.searchParams.set('callbackUrl', pathname);
            return NextResponse.redirect(signInUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Protected pages
        '/issues/list',
        '/issues/list/new',
        '/issues/list/:id/edit',
        // Protected API routes
        '/api/issues/:path*',
    ],
};
