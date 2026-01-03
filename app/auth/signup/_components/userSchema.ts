import { z } from 'zod';

export const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password cannot exceed 20 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*]/, "Password must contain at least one special character");

export const signUpSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.email().min(1, 'Email is required'),
    password: passwordSchema,
});

export const signInSchema = z.object({
    email: z.email().min(1, 'Email is required'),
    password: passwordSchema,
});