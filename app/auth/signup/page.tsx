'use client';
import { Card, Container, Grid, Separator, Tabs } from '@radix-ui/themes';
import SignInTab from './_components/SignInTab';
import SignUpTab from './_components/SignUpTab';
import SocialAuthButtons from './_components/SocialAuthButtons';
import { useEffect } from 'react';
import { authClient } from '@/app/lib/auth-client';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
  const router = useRouter();
  useEffect( () => {
    authClient.getSession().then( session => {
      if(session.data != null) router.push('/');
    })
  }, [router]);

  return (
    <Container size="1" className="mt-10">
      <Tabs.Root defaultValue="signin" orientation="vertical" className='mx-auto max-w-md my-6 px-4'>
        <Tabs.List>
          <Tabs.Trigger value="signin">Sign In</Tabs.Trigger>
          <Tabs.Trigger value="signup">Sign Up</Tabs.Trigger>
        </Tabs.List>

        <Card>
          <Tabs.Content value="signin">
            <SignInTab />
            <Separator my='3' size='4' />
            <Grid columns='2' gap='2' width='auto'>
              <SocialAuthButtons />
            </Grid>
          </Tabs.Content>
          <Tabs.Content value="signup">
            <SignUpTab />
            <Separator my='3' size='4' />
            <Grid columns='2' gap='2' width='auto'>
              <SocialAuthButtons />
            </Grid>
          </Tabs.Content>
        </Card>

      </Tabs.Root>
    </Container>
  )
}

export default SignUpPage;