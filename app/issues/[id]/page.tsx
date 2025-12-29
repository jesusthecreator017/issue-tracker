import { IssueStatusBadge } from '@/app/components';
import { prisma } from '@/prisma/client';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import Link from 'next/link';
import { issue } from '@uiw/react-md-editor';

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
        <Grid columns={{ initial: '1', md: '2' }} gap='5'>
            <Box>
                <Heading>{currIssue.title}</Heading>
                <Flex gap='3' my='2'>
                    <IssueStatusBadge status={currIssue.status} />
                    <Text>{currIssue.createdAt.toDateString()}</Text>
                </Flex>
                <Card className='prose prose-slate dark:prose-invert mt-4'>
                    <ReactMarkdown rehypePlugins={[[rehypeSanitize]]}>{currIssue.description}</ReactMarkdown>
                </Card>
            </Box>
            <Box>
                <Button>
                    <Pencil2Icon />
                    <Link href={`/issues/${currIssue.id}/edit`}>Edit Issue</Link>
                </Button>
            </Box>
        </Grid>
    )
}

export default IssueDetailPage
