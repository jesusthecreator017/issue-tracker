import { Skeleton, Box, Flex, Button } from '@radix-ui/themes';

const LoadingNewIssuePage = () => {
  return (
    <Box className='max-w-xl'>
      <Flex direction='column' gap='2'>
        <Skeleton height='2rem' />
        <Skeleton height='38rem'/>
        <Skeleton width='9rem' height='2rem'/>
      </Flex>
    </Box>
  );
}

export default LoadingNewIssuePage
