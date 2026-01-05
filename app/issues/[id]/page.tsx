import { prisma } from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './delete/DeleteIssueButton';
import AssigneeSelect from './AssigneeSelect';

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
        <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
            <Box className='md:col-span-4'>
                <IssueDetails issue={currIssue} />
            </Box>
            <Box>
                <Flex direction='column' gap='1rem'>
                    <AssigneeSelect issue={currIssue} />
                    <EditIssueButton issueId={currIssue.id} />
                    <DeleteIssueButton issueId={currIssue.id} />
                </Flex>
            </Box>
        </Grid>
    )
}

export default IssueDetailPage;
