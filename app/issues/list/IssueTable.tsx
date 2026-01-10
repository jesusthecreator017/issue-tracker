import { IssueStatusBadge, Link } from '@/app/components'
import { ArrowUpIcon, ArrowDownIcon } from '@radix-ui/react-icons'
import { Table, Flex } from '@radix-ui/themes'
import NextLink from 'next/link'
import { Issue } from '@/generated/prisma/client'

export interface IssueQuery {
    status?: string, 
    orderBy?: keyof Issue, 
    order?: 'asc' | 'desc',
    page: string,
}

interface Props {
    searchParams: IssueQuery,
    issues: Issue[],
};

const IssueTable = ({ searchParams, issues }: Props) => {
    //const resSearchParams = await searchParams;
    //const resIssues = await issues;

    const { orderBy, order } = searchParams;
    const sortDirection = order === 'desc' ? 'desc' : 'asc';

    return (
        <Table.Root variant='surface'>
            <Table.Header>
                <Table.Row>
                    {
                        columns.map((column) => (
                            <Table.ColumnHeaderCell key={column.value} className={column.className} >
                                <Flex gap='1' direction='row' align='center'>
                                    {column.label}
                                    <NextLink href={{ query: { ...searchParams, orderBy: column.value, order: 'asc' } }}>
                                        <ArrowUpIcon className={orderBy === column.value && sortDirection === 'asc' ? 'text-amber-600' : 'text-gray-400'} />
                                    </NextLink>
                                    <NextLink href={{ query: { ...searchParams, orderBy: column.value, order: 'desc' } }}>
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
    )
}

const columns: { label: string, value: keyof Issue, className?: string }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: "hidden md:table-cell" },
    { label: 'Created', value: 'createdAt', className: "hidden md:table-cell" },
];
export const columnNames = columns.map(column => column.value);

export default IssueTable;
