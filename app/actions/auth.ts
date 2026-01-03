'use server';

import { headers } from "next/headers";
import { auth } from "../lib/auth";
import { redirect } from "next/navigation";

export async function signUpAction(formData: FormData){
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    await auth.api.signUpEmail({
        body: {
            email,
            password,
            name,
            callbackURL: '/dashboard'
        }
    });

    redirect('/dashboard');
}

export async function signInAction(formData: FormData){
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    await auth.api.signInEmail({
        body: {
            email,
            password,
            callbackURL: '/dashboard'
        }
    });

    redirect('/dashboard');
}

export async function signOutAction(){
    await auth.api.signOut({
        headers: await headers()
    });

    redirect('/');
}