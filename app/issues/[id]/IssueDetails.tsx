import { IssueStatusBadge } from '@/app/components';
import { Issue } from '@/generated/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';

const IssueDetails = ({ issue }: { issue: Issue }) => {
    return (
        <>
            <Heading>{issue.title}</Heading>
            <Flex gap='3' my='2'>
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className='prose prose-slate dark:prose-invert mt-4'>
                <ReactMarkdown rehypePlugins={[[rehypeSanitize]]}>{issue.description}</ReactMarkdown>
            </Card>
        </>
    );
}

export default IssueDetails
