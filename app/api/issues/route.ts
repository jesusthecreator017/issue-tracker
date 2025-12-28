import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { z } from 'zod'
import { jsxs } from "react/jsx-runtime";
import { error } from "console";

const createIssueSchema = z.object({
    title: z.string().min(1, 'Title is required.').max(255),
    description: z.string().min(1, 'Description is required')
});

export async function GET(request: NextRequest){
    const issues = prisma.issue.findMany();
    return NextResponse.json(issues, {status: 200});
}

export async function POST(request: NextRequest){
    // Get the request body
    const body = await request.json();

    // Validate the request
    const validation = createIssueSchema.safeParse(body);

    if(!validation.success){
        return NextResponse.json(validation.error.issues, {status: 400});
    }

    // Create the new issue object
    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description
        }
    });

    return NextResponse.json(newIssue, {status: 201});
}