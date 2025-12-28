'use client'
import React from 'react'
import axios from 'axios'
import { TextField, TextArea, Button, Callout } from '@radix-ui/themes'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface IssueForm {
  title: string,
  description: string
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const [error, setError] = useState('');

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
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            setError('An unexpected error occured');
          }
        })}
      >
        <TextField.Root placeholder='Title' radius='medium' {...register('title')}>
        </TextField.Root>
        <Controller name='description' control={control} render={({ field }) => <TextArea placeholder='Description'{...field} />} />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
}

export default NewIssuePage;
