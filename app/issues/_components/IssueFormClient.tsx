'use client'

import dynamic from 'next/dynamic'
import IssueFormSkeleton from './IssueFormSkeleton'
import { Issue } from '@/generated/prisma/client'

const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
  }
)

export default function IssueFormClient({ issue }: { issue?: Issue }) {
  return <IssueForm issue={issue} />
}
