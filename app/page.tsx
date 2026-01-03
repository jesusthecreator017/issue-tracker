import Link from 'next/link';
import { auth } from './lib/auth';
import { headers } from 'next/headers';
import { Button } from '@radix-ui/themes';
import { PersonIcon } from '@radix-ui/react-icons';

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if(!session){
    return (
      <div>
        <Button asChild>
          <Link href='/auth/signup'>
            <PersonIcon />
            Sign Up
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      Hello World!
    </div>
  );
}
