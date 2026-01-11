'use client';
import { Flex, Text } from '@radix-ui/themes';
import { authClient } from './lib/auth-client';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import UnloggedSession from './UnloggedSession';

interface Props {
    children: ReactNode;
}

const HomeClient = ({ children }: Props) => {
    const { data: session, isPending: loading } = authClient.useSession();
    const router = useRouter();
    /*
    return (
        <div className='my-6 px-4 max-w-md mx-auto'>
            <div className='text-center space-y-6'>
                {loading ? (
                    <p className='text-gray-500'>Loading...</p>
                    //Add Skeleton Here
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
    */

    return (
        <Flex direction='column' gap='3'>
            {
            loading ? (
                // Add Skeleton Here
                <Text>Loading</Text>
            ) : (
                // If there is a session render the children page
                // If ther is NOT a session Let the user know that they are not signed in 
                <>
                    {session && children}
                    {!session && (
                        <UnloggedSession />
                    )}
                </>
            )
            }
        </Flex>
    )

}

export default HomeClient;
