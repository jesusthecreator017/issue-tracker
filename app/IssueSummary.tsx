import { Status } from '@/generated/prisma/enums'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
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
        status: Status,
        color: 'red' | 'violet' | 'green',
    }[] = [
        { label: 'Open', value: open, status: 'OPEN', color: 'red'},
        { label: 'In Progress', value: inProgress, status: 'IN_PROGRESS', color: 'violet'},
        { label: 'Closed', value: closed, status: 'CLOSED', color: 'green'}
    ];

  return (
    <Card>
        <Heading mb='2'>Issues</Heading>
        <Flex gap='2'>
            {     
                containers.map( container => (
                    <Card key={container.label}>
                        <Flex direction='column' gap='1'>
                            <Text size='2' weight='medium' asChild>
                                <Link href={`/issues/list?status=${container.status}`}>
                                    {container.label}
                                </Link>
                            </Text>
                        </Flex>
                        <Text size='5' weight='bold' color={container.color}>
                            {container.value}
                        </Text>
                    </Card>
                ))
            }
        </Flex>
    </Card>
  );
}

export default IssueSummary
