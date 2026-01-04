'use client'
import Link from 'next/link';
import { IoBugSharp } from "react-icons/io5";
import { usePathname } from 'next/navigation';
import { Avatar, Box, Button, DropdownMenu, TabNav, Text } from '@radix-ui/themes';
import { PersonIcon } from '@radix-ui/react-icons';
import { authClient } from './lib/auth-client';
import { Skeleton } from '@radix-ui/themes';

const NavBar = () => {
    const currentPath = usePathname();
    const { data: session, isPending: loading } = authClient.useSession();

    const links = [
        { label: 'Dashboard', href: '/'},
        { label: 'Issues', href: '/issues'},
    ]

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <nav className='flex border-b mb-5 px-5 h-14 items-center justify-between'>
            <div className='flex space-x-6 items-center'>
                <Link href='/'><IoBugSharp /></Link>
                <TabNav.Root color='jade'>
                    {links.map((link) => (
                        <TabNav.Link key={link.href} href={link.href} active={currentPath === link.href || currentPath.startsWith(link.href + '/')}>
                            {link.label}
                        </TabNav.Link>
                    ))}
                </TabNav.Root>
            </div>

            <Box>
                {loading ? (
                    <Skeleton width="32px" height="32px" style={{ borderRadius: '50%' }} />
                ) : session ? (
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <button className="cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-jade-500">
                                <Avatar
                                    src={session.user?.image || undefined}
                                    fallback={getInitials(session.user?.name || 'U')}
                                    size="2"
                                    radius="full"
                                />
                            </button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content align="end">
                            <DropdownMenu.Label>
                                <Text size="2" weight="bold">{session.user?.name}</Text>
                            </DropdownMenu.Label>
                            <DropdownMenu.Label>
                                <Text size="1" color="gray">{session.user?.email}</Text>
                            </DropdownMenu.Label>
                            <DropdownMenu.Separator />
                            <DropdownMenu.Item
                                color="red"
                                onClick={() => authClient.signOut()}
                            >
                                Sign Out
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                ) : (
                    <Button asChild size="2" variant="soft">
                        <Link href='/auth/signup'>
                            <PersonIcon />
                            Sign In
                        </Link>
                    </Button>
                )}
            </Box>
        </nav>
    );
}

export default NavBar
