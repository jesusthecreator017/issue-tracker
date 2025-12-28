import React from 'react'
import Link from 'next/link'
import { Button } from '@radix-ui/themes'
import { PlusCircledIcon } from '@radix-ui/react-icons'

const IssuesPage = () => {
  return (
    <div>
      <Button>
        <PlusCircledIcon height='16' width='16'/>
        <Link href='/issues/new'>New Issue</Link>
      </Button>
    </div>
  )
}

export default IssuesPage
