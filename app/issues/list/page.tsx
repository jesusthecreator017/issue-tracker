import Pagination from '@/app/components/Pagination';
import { Issue, Status } from '@/generated/prisma/client';
import { prisma } from '@/prisma/client';
import IssueActions from './IssueActions';
import IssueTable, { columnNames, IssueQuery } from './IssueTable';
import { Flex } from '@radix-ui/themes';

interface Props {
  searchParams: IssueQuery,
}

const IssuesPage = async ({ searchParams }: Props) => {

  const resolvedParams = await searchParams;
  const { status, orderBy, order } = resolvedParams;
  const validStatuses = Object.values(Status);
  const statusFilter = validStatuses.includes(status as Status) ? status as Status : undefined;
  const where = { status: statusFilter };
  const sortDirection = order === 'desc' ? 'desc' : 'asc';
  const validOrderBy = columnNames.includes(orderBy as keyof Issue) ? { [orderBy as string]: sortDirection } : undefined;

  const page = parseInt(resolvedParams.page) || 1;  
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy: validOrderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({
    where,
  })

  return (
    <Flex direction='column' gap='3'>
      <IssueActions />
      <IssueTable searchParams={resolvedParams} issues={issues}/>
      <Pagination 
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  )
}

export const dynamic = 'force-dynamic';

export default IssuesPage;
