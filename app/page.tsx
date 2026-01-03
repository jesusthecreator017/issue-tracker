import Link from 'next/link';
import { auth } from './lib/auth';
import { headers } from 'next/headers';

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if(!session){
    return (
      <div>
        <Link href='/signup'>Sign Up</Link>
      </div>
    );
  }

  return (
    <div>
      Hello World!
    </div>
  );
}
