import { prisma } from '@/prisma/client'
import { Flex } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import IssueFormClient from '../../_components/IssueFormClient'
import StatusSelect from '../../_components/StatusSelect'

interface Props {
  params: { id: string }
}

const EditIssuePage = async ({ params }: Props) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) }
  });

  if (!issue) notFound();

  return (
    <Flex direction='column' gap='3'>
      <IssueFormClient issue={issue} />
      
    </Flex>
  )
}

export default EditIssuePage
