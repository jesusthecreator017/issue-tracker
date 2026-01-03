'use client';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from "radix-ui";
import z from 'zod';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Button, TextField, IconButton, Text } from '@radix-ui/themes';
import { ErrorMessage } from '@/app/components';
import { signInSchema } from './userSchema';

type SignInForm = z.infer<typeof signInSchema>;

const SignInTab = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInForm) => {
    console.log(data);
  }

  return (
    <>
      <Text size='6' align='center' weight='bold' as='div'>Sign In</Text>
      <Form.Root className='w-auto space-y-3' onSubmit={handleSubmit(onSubmit)}>
        {/* Email field */}
        <Form.Field name='email' className='grid'>
          <Form.Label className='text-md font-medium leading-8 text-white'>
            Email
          </Form.Label>
          <Form.Control asChild>
            <TextField.Root
              type="email"
              placeholder='e.g. john@example.com'
              radius="medium"
              size='3'
              {...register('email')}
            />
          </Form.Control>
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </Form.Field>

        {/* Password field */}
        <Form.Field name='password' className='grid'>
          <Form.Label className='text-md font-medium leading-8 text-white'>
            Password
          </Form.Label>
          <Form.Control asChild>
            <TextField.Root
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter your password'
              radius='medium'
              size='3'
              {...register('password')}
            >
              <TextField.Slot side='right'>
                <IconButton
                  size='1'
                  variant='ghost'
                  onClick={() => setShowPassword(!showPassword)}
                  type='button'
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </IconButton>
              </TextField.Slot>
            </TextField.Root>
          </Form.Control>
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </Form.Field>

        {/* Submit button */}
        <Form.Submit asChild>
          <Button
            disabled={isSubmitting}
            color='jade'
            size='4'
          >
            Sign In
          </Button>
        </Form.Submit>
      </Form.Root>
    </>
  )
}

export default SignInTab
