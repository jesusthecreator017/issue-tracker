import { Box, Card, Flex, Skeleton, Text } from '@radix-ui/themes'

const LoadingIssueDetailPage = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton height='2.5rem'></Skeleton>
      <Flex gap='3' my='2'>
        <Skeleton width='4rem' height='1.5rem'/>
        <Skeleton width='8rem' height='1.5rem'/>
      </Flex>
      <Card className='prose prose-slate dark:prose-invert mt-4'>
        <Text>
          <Skeleton>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias laboriosam aspernatur voluptate,
            reiciendis excepturi minima perspiciatis ea necessitatibus a quam commodi eligendi atque fugit 
            harum ex reprehenderit expedita, totam mollitia.
          </Skeleton>
        </Text>
      </Card>
    </Box>
  )
}

export default LoadingIssueDetailPage
