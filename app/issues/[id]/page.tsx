import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { prisma } from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react'

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
    const { id } = await params;

    const currIssue = await prisma.issue.findUnique({
        where: { id: parseInt(id) }
    })

    if (!currIssue) {
        notFound();
    }

    return (
        <div>
            <Heading>{currIssue.title}</Heading>
            <Flex gap='3' my='2'>
                <IssueStatusBadge status={currIssue.status} />
                <Text>{currIssue.createdAt.toDateString()}</Text>
            </Flex>
            <Card>
                <p>{currIssue.description}</p>
            </Card>
        </div>
    )
}

export default IssueDetailPage
