'use client'
import React from 'react'
import axios from 'axios'
import { TextField, TextArea, Button } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'

interface IssueForm {
  title: string,
  description: string
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  

  return (
    <form 
      className='max-w-xl space-y-3'
      onSubmit={handleSubmit( async (data) => {
        await axios.post('/api/issues', data)
        router.push('/issues')
      })}
    >
      <TextField.Root placeholder='Title' radius='medium' {...register('title')}>
      </TextField.Root> 
      <Controller name='description' control={control} render={({ field }) => <TextArea placeholder='Description'{...field}/>}/>
      <Button>Submit New Issue</Button>
    </form>
  );
}

export default NewIssuePage;
