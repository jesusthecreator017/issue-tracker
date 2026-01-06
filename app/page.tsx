'use client';
import Pagination from './components/Pagination';
import { authClient } from './lib/auth-client';

export default function Home() {
  const { data: session, isPending: loading } = authClient.useSession();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='my-6 px-4 max-w-md mx-auto'>
      <div className='text-center space-y-6'>
        <h1 className='text-2xl font-bold'>
          {session ? `Hello, ${session.user?.name || 'User'}!` : 'Welcome to our App'}
        </h1>
        {!session && (
          <p className='text-gray-500'>Sign in to get started</p>
        )}
        <Pagination itemCount={100} pageSize={10} currentPage={2}/>
      </div>
    </div>
  );
}
