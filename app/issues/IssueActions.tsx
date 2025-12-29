import { PlusCircledIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const IssueActions = () => {
    return (
        <div className='mb-5'>
            <Button>
                <PlusCircledIcon height='16' width='16' />
                <Link href='/issues/new'>New Issue</Link>
            </Button>
        </div>
    );
}

export default IssueActions
