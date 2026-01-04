import { Skeleton } from '@radix-ui/themes';

const LoadingHomePage = () => {
    return (
        <div className='my-6 px-4 max-w-md mx-auto'>
            <div className='text-center space-y-6'>
                <Skeleton height="32px" width="250px" className="mx-auto" />
                <Skeleton height="20px" width="180px" className="mx-auto" />
            </div>
        </div>
    );
}

export default LoadingHomePage;
