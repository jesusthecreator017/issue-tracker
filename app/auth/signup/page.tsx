import React from 'react';
import { signUpAction } from '../../actions/auth';
import { Card, Container, Tabs, Text } from '@radix-ui/themes';
import SignUpTab from './_components/SignUpTab';
import SignInTab from './_components/SignInTab';

const SignUpPage = () => {
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
          </Tabs.Content>
          <Tabs.Content value="signup">
            <SignUpTab />
          </Tabs.Content>
        </Card>

      </Tabs.Root>
    </Container>
  )
}

export default SignUpPage;