'use client'
import axios from 'axios'
import { validationSchema } from '@/app/validationSchema'
import { TextField, TextArea, Button, Callout, Spinner } from '@radix-ui/themes'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage'
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
import delay from 'delay'

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
