'use client'

import { Button, Callout, Spinner, TextField } from '@radix-ui/themes'
import { Controller, useForm } from 'react-hook-form'
import { validationSchema } from '@/app/validationSchema'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'
import axios from 'axios'
import ErrorMessage from '@/app/components/ErrorMessage'
import rehypeSanitize from "rehype-sanitize"
import dynamic from 'next/dynamic'

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { ssr: false }
)

type IssueForm = z.infer<typeof validationSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(validationSchema)
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post('/api/issues', data);
      router.push('/issues');
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
        <TextField.Root placeholder='Title' radius='medium' {...register('title')}></TextField.Root>
        <ErrorMessage>
          {errors.title?.message}
        </ErrorMessage>
        <Controller name='description' control={control} render={({ field }) => <MDEditor height={600} aria-placeholder='Description' previewOptions={{rehypePlugins: [[rehypeSanitize]]}}{...field}/>} />
        <ErrorMessage>
          {errors.description?.message}
        </ErrorMessage>
        <Button disabled={isSubmitting}>{isSubmitting && <Spinner />}Submit New Issue</Button>
      </form>
    </div>
  );
}

export default NewIssuePage;
