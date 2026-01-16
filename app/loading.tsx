import { Card, Flex, Grid, Skeleton, Table } from '@radix-ui/themes';

const LoadingHomePage = () => {
    return (
        <Grid columns={{ initial: '1', md: '2' }} gap='5' align='stretch'>
            {/* Left Column */}
            <Flex direction='column' gap='3'>
                {/* IssueSummary Skeleton */}
                <Card>
                    <Skeleton height='24px' width='80px' mb='2' />
                    <Flex gap='2'>
                        {[1, 2, 3].map((i) => (
                            <Card key={i}>
                                <Flex direction='column' gap='1'>
                                    <Skeleton height='14px' width='70px' />
                                    <Skeleton height='28px' width='30px' />
                                </Flex>
                            </Card>
                        ))}
                    </Flex>
                </Card>

                {/* LatestIssues Skeleton */}
                <Card>
                    <Flex direction='column' gap='3'>
                        <Skeleton height='24px' width='120px' />
                        <Table.Root variant='surface'>
                            <Table.Body>
                                {/* TODO(human): Add 5 skeleton rows here */}
                            </Table.Body>
                        </Table.Root>
                    </Flex>
                </Card>
            </Flex>

            {/* Right Column - Chart Skeleton */}
            <Card style={{ height: '100%' }}>
                <Skeleton height='100%' minHeight='300px' />
            </Card>
        </Grid>
    );
}

export default LoadingHomePage;
