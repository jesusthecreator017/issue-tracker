import { PlusCircledIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import IssueStatusFilter from './IssueStatusFilter'

const IssueActions = () => {
    return (
        <Flex justify='between'>
            <IssueStatusFilter />
            <Button>
                <PlusCircledIcon height='16' width='16' />
                <Link href='/issues/new'>New Issue</Link>
            </Button>
        </Flex>
    );
}

export default IssueActions
