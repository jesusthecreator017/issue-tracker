'use client';
import { Flex, Grid, Text } from '@radix-ui/themes';
import { authClient } from './lib/auth-client';
import { ReactNode } from 'react';
import UnloggedSession from './UnloggedSession';

interface Props {
    leftContent: ReactNode;
    rightContent: ReactNode;
}

const HomeClient = ({ leftContent, rightContent }: Props) => {
    const { data: session, isPending: loading } = authClient.useSession();

    if (loading) {
        return <Text>Loading</Text>;
    }

    if (!session) {
        return <UnloggedSession />;
    }

    return (
        <Grid columns={{ initial: '1', md: '2' }} gap='5' align='stretch'>
            <Flex direction='column' gap='3'>
                {leftContent}
            </Flex>
            <Flex direction='column' gap='3'>
                {rightContent}
            </Flex>
        </Grid>
    );
}

export default HomeClient;
