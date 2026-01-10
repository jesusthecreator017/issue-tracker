'use client';
import { authClient } from './lib/auth-client';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const HomeClient = ({ children }: Props) => {
    const { data: session, isPending: loading } = authClient.useSession();

    return (
        <div className='my-6 px-4 max-w-md mx-auto'>
            <div className='text-center space-y-6'>
                {loading ? (
                    <p className='text-gray-500'>Loading...</p>
                ) : (
                    <>
                        <h1 className='text-2xl font-bold'>
                            {session ? `Hello, ${session.user?.name || 'User'}!` : 'Welcome to our App'}
                        </h1>
                        {session && children}
                        {!session && (
                            <p className='text-gray-500'>Sign in to get started</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default HomeClient;
