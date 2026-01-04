import { Box, Card, Container, Flex, Skeleton, Tabs } from '@radix-ui/themes';

const LoadingAuthPage = () => {
    return (
        <Container size="1" className="mt-10">
            <div className='mx-auto max-w-md my-6 px-4'>
                {/* Tab triggers skeleton */}
                <Flex gap="4" mb="4">
                    <Skeleton height="36px" width="80px" />
                    <Skeleton height="36px" width="80px" />
                </Flex>

                <Card>
                    <Box className="space-y-4 p-2">
                        {/* Title skeleton */}
                        <Skeleton height="28px" width="100px" className="mx-auto" />

                        {/* Form fields skeleton */}
                        <Box className="space-y-3">
                            {/* Email field */}
                            <Box>
                                <Skeleton height="20px" width="50px" mb="2" />
                                <Skeleton height="40px" width="100%" />
                            </Box>

                            {/* Password field */}
                            <Box>
                                <Skeleton height="20px" width="70px" mb="2" />
                                <Skeleton height="40px" width="100%" />
                            </Box>

                            {/* Submit button */}
                            <Skeleton height="44px" width="100%" />
                        </Box>

                        {/* Separator */}
                        <Skeleton height="1px" width="100%" my="3" />

                        {/* Social buttons skeleton */}
                        <Flex gap="2">
                            <Skeleton height="36px" style={{ flex: 1 }} />
                            <Skeleton height="36px" style={{ flex: 1 }} />
                        </Flex>
                    </Box>
                </Card>
            </div>
        </Container>
    );
}

export default LoadingAuthPage;
