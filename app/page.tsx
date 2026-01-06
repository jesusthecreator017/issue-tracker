'use client';
import Pagination from './components/Pagination';
import { authClient } from './lib/auth-client';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const { data: session, isPending: loading } = authClient.useSession();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';

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
            {!session && (
              <p className='text-gray-500'>Sign in to get started</p>
            )}
          </>
        )}
        <Pagination itemCount={100} pageSize={10} currentPage={parseInt(page)}/>
      </div>
    </div>
  );
}
