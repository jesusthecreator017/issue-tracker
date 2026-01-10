import { Status } from '@/generated/prisma/enums'
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link';

interface Props {
    open: number,
    inProgress: number,
    closed: number
}

const IssueSummary = ({ open, inProgress, closed }: Props ) => {
    const containers: {
        label: string,
        value: number,
        status: Status
    }[] = [
        { label: 'Open Issue', value: open, status: 'OPEN'},
        { label: 'In Progress Issue', value: inProgress, status: 'IN_PROGRESS'},
        { label: 'Closed Issue', value: closed, status: 'CLOSED'}
    ];

  return (
    <Flex gap='4'>
        {
            containers.map( container => (
                <Card key={container.label}>
                    <Flex direction='column' gap='1'>
                        <Text size='2' weight='medium' asChild>
                            <Link href={`/issues/list?status=${container.status}`}>{container.label}</Link>
                        </Text>
                    </Flex>
                    <Text size='5' weight='bold'>{container.value}</Text>
                </Card>
            ))
        }
    </Flex>
  )
}

export default IssueSummary
