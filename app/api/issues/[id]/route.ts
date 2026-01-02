import { issueSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    // Fetch the Request
    const { id } = await params;
    const body = await request.json();

    // Validate the body
    const validation = issueSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.issues, { status: 400 });
    }

    // If the body is valid: 
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) }
    });

    if (!issue) {
        return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });
    }

    const updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
            title: body.title,
            description: body.description,
            //status: body.status
        }
    });

    return NextResponse.json(updatedIssue);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) }
    });

    if (!issue) {
        return NextResponse.json({ error: 'Invalid Issue' }, { status: 404 });
    }

    await prisma.issue.delete({
        where: { id: issue.id }
    });

    return NextResponse.json({});
}