'use client';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Form } from "radix-ui";
import z from 'zod';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Button, TextField, IconButton, Text } from '@radix-ui/themes';
import { ErrorMessage } from '@/app/components';
import { signUpSchema } from './userSchema';
import { authClient } from '@/app/lib/auth-client';
import { toast } from 'sonner';

type SignUpForm = z.infer<typeof signUpSchema>;

const SignUpTab = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (formData: SignUpForm) => {
    const { data, error } = await authClient.signUp.email({
      ...formData,
      callbackURL: '/',
    });

    if (error) {
      toast.error('Sign Up Failed', {
        description: error.message || 'An error occurred during sign up. Please try again.',
      });
      return;
    }

    if (data) {
      toast.success('Account Created!', {
        description: 'Your account has been created successfully.',
      });
      router.push('/');
    }
  }

  return (
    <>
      <Text size='6' align='center' weight='bold' as='div'>Sign Up</Text>
      <Form.Root className='w-auto space-y-3' onSubmit={handleSubmit(onSubmit)}>
        <Form.Field name='name' className='grid'>
          <Form.Label className='text-md font-medium leading-8 text-white'>
            Name
          </Form.Label>
          <Form.Control asChild>
            <TextField.Root
              placeholder="e.g. John Doe"
              radius="medium"
              size="3"
              {...register('name')}
            />
          </Form.Control>
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </Form.Field>

        <Form.Field name='email' className='grid'>
          <Form.Label className='text-md font-medium leading-8 text-white'>
            Email
          </Form.Label>
          <Form.Control asChild>
            <TextField.Root
              type="email"
              placeholder="e.g. john@example.com"
              radius="medium"
              size="3"
              {...register('email')}
            />
          </Form.Control>
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </Form.Field>

        <Form.Field name='password' className='grid'>
          <Form.Label className='text-md font-medium leading-8 text-white'>
            Password
          </Form.Label>
          <Form.Control asChild>
            <TextField.Root
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              radius="medium"
              size="3"
              {...register('password')}
            >
              <TextField.Slot side="right">
                <IconButton
                  size="1"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
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
            Sign Up
          </Button>
        </Form.Submit>
      </Form.Root>
    </>
  )
}

export default SignUpTab;
