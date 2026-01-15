import { prisma } from "@/prisma/client";

export interface IssueStats {
    open: number;
    inProgress: number;
    closed: number;
}

export async function getIssueStats(): Promise<IssueStats> {
    const open = await prisma.issue.count({
        where: { status: 'OPEN' }
    });

    const inProgress = await prisma.issue.count({
        where: { status: 'IN_PROGRESS' }
    });

    const closed = await prisma.issue.count({
        where: { status: 'CLOSED' }
    });

    return { open, inProgress, closed };
}
