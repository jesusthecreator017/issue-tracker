import { prisma } from '@/prisma/client';
import { Box, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';

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
                <IssueDetails issue={ currIssue } />
            </Box>
            <Box>
                <EditIssueButton issueId={currIssue.id} />
            </Box>
        </Grid>
    )
}

export default IssueDetailPage;
