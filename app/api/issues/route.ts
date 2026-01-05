import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { issueSchema } from "@/app/validationSchema";

export async function GET(request: NextRequest) {
    const issues = prisma.issue.findMany();
    return NextResponse.json(issues, { status: 200 });
}

export async function POST(request: NextRequest) {
    // Get the request body
    const body = await request.json();

    // Validate the request
    const validation = issueSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.issues, { status: 400 });
    }

    // Create the new issue object
    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description,
            status: body.status
        }
    });

    return NextResponse.json(newIssue, { status: 201 });
}