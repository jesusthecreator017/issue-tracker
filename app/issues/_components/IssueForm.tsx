'use client'

import { ErrorMessage } from '@/app/components'
import { issueSchema } from '@/app/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Button, Callout, Spinner, TextField } from '@radix-ui/themes'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import rehypeSanitize from "rehype-sanitize"
import { z } from 'zod'
import { Issue } from '@/generated/prisma/client'

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { ssr: false }
)

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema)
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue) {
        await axios.patch('/api/issues/' + issue.id, data);
      } else {
        await axios.post('/api/issues', data);
      }
      router.push('/issues');
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occured');
    }
  });

  return (
    <div className='max-w-xl'>
      {error &&
        (<Callout.Root color='red' className='mb-5'>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            {error}
          </Callout.Text>
        </Callout.Root>
        )}
      <form
        className='space-y-3'
        onSubmit={onSubmit}
      >
        <TextField.Root placeholder='Title' defaultValue={issue?.title} radius='medium' {...register('title')}></TextField.Root>
        <ErrorMessage>
          {errors.title?.message}
        </ErrorMessage>
        <Controller name='description' control={control} defaultValue={issue?.description} render={({ field }) => <MDEditor height={600} aria-placeholder='Description' previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}{...field} />} />
        <ErrorMessage>
          {errors.description?.message}
        </ErrorMessage>
        <Button disabled={isSubmitting}>
          {isSubmitting && <Spinner />}{issue ? 'Update Issue' : 'Submit New Issue'}{' '}
        </Button>
      </form>
    </div>
  );
}

export default IssueForm;
