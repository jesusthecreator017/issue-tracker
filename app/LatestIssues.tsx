import { prisma } from '@/prisma/client'
import { Card, Table, Text, Flex, Heading } from '@radix-ui/themes';
import { IssueStatusBadge } from './components';
import Link from 'next/link';
import { Avatar } from '@radix-ui/themes';

const LatestIssues = async () => {
    const issues = await prisma.issue.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
            assignedToUser: true
        }
    });

    return (
        <Card>
            <Flex direction='column' gap='3'>
                <Heading weight='bold'>Latest Issues</Heading>
                <Table.Root variant='surface'>
                    <Table.Body>
                        {   
                            issues.map( issue => (
                                <Table.Row key={issue.id}>
                                    <Table.Cell>
                                        <Flex justify='between'>
                                            <Flex direction='column' align='start'>
                                                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                                                <IssueStatusBadge status={issue.status}/>
                                            </Flex>
                                            {issue.assignedToUserId && (
                                            <Avatar 
                                                src={issue.assignedToUser?.image ?? undefined}
                                                fallback={issue.assignedToUser?.name[0]!}
                                                size='2'
                                                radius='full'
                                            />
                                            )}
                                        </Flex>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                </Table.Root>
            </Flex>
        </Card>
    );
}

export default LatestIssues;
