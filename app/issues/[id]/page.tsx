import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation';
import React from 'react'

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
    const { id } = await params;
    if(typeof id !== 'number') notFound();

    const currIssue = await prisma.issue.findUnique({
        where: { id: parseInt(id)}
    })

    if(!currIssue){
        notFound();
    }

  return (
    <div>
      <p>{currIssue.title}</p>
      <p>{currIssue.description}</p>
      <p>{currIssue.status}</p>
      <p>{currIssue.createdAt.toDateString()}</p>
    </div>
  )
}

export default IssueDetailPage
