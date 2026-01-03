'use client';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from "radix-ui";
import z from 'zod';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Button, TextField, IconButton } from '@radix-ui/themes';
import { ErrorMessage } from '@/app/components';

const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password cannot exceed 20 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*]/, "Password must contain at least one special character");

const signUpSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.email().min(1, 'Email is required'),
    password: passwordSchema,
});

type SignUpForm = z.infer<typeof signUpSchema>;

const SignUpTab = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpForm>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: SignUpForm) => {
        console.log(data);
    }

    return (
        <Form.Root className='w-auto space-y-3' onSubmit={handleSubmit(onSubmit)}>
            <Form.Field name='name' className='grid'>
                <Form.Label className='text-md font-medium leading-8 text-white'>
                    Name
                </Form.Label>
                <Form.Control asChild>
                    <TextField.Root
                        placeholder="Enter your name"
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
                        placeholder="Enter your email"
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
    )
}

export default SignUpTab;
