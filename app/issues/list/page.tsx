import { prisma } from '@/prisma/client'
import { Status, Issue } from '@/generated/prisma/client'
import { Table, Flex } from '@radix-ui/themes'
import NextLink from 'next/link'
import { IssueStatusBadge, Link } from '@/app/components';
import IssueActions from './IssueActions'
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import Pagination from '@/app/components/Pagination';

interface Props {
  searchParams: { 
    status?: string, 
    orderBy?: keyof Issue, 
    order?: 'asc' | 'desc',
    page: string,
  }
}

const IssuesPage = async ({ searchParams }: Props) => {

  const columns: { label: string, value: keyof Issue, className?: string }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: "hidden md:table-cell" },
    { label: 'Created', value: 'createdAt', className: "hidden md:table-cell" },
  ]

  const resolvedParams = await searchParams;
  const { status, orderBy, order } = resolvedParams;
  const validStatuses = Object.values(Status);
  const statusFilter = validStatuses.includes(status as Status) ? status as Status : undefined;
  const where = { status: statusFilter };
  const columnValues = columns.map(column => column.value);
  const sortDirection = order === 'desc' ? 'desc' : 'asc';
  const validOrderBy = columnValues.includes(orderBy as keyof Issue) ? { [orderBy as string]: sortDirection } : undefined;

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
    <div>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {
              columns.map((column) => (
                <Table.ColumnHeaderCell key={column.value} className={column.className} >
                  <Flex gap='1' direction='row' align='center'>
                    {column.label}
                    <NextLink href={{ query: { ...resolvedParams, orderBy: column.value, order: 'asc' } }}>
                      <ArrowUpIcon className={orderBy === column.value && sortDirection === 'asc' ? 'text-amber-600' : 'text-gray-400'} />
                    </NextLink>
                    <NextLink href={{ query: { ...resolvedParams, orderBy: column.value, order: 'desc' } }}>
                      <ArrowDownIcon className={orderBy === column.value && sortDirection === 'desc' ? 'text-cyan-600' : 'text-gray-400'} />
                    </NextLink>
                  </Flex>
                </Table.ColumnHeaderCell>
              ))
            }
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                </Link>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination 
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </div>
  )
}

export const dynamic = 'force-dynamic';

export default IssuesPage;
