'use client'
import Link from 'next/link';
import { IoBugSharp } from "react-icons/io5";
import { usePathname } from 'next/navigation';
import { Button, TabNav, Flex } from '@radix-ui/themes';

const NavBar = () => {
    const currentPath = usePathname();

    const links = [
        { label: 'Dashboard', href: '/'},
        { label: 'Issues', href: '/issues'},
    ]

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href='/'><IoBugSharp /></Link>
        <TabNav.Root color='jade'>
            {links.map((link) => (
                <TabNav.Link key={link.href} href={link.href} active={currentPath === link.href || currentPath.startsWith(link.href + '/')}>
                    {link.label}
                </TabNav.Link>
            ))}
        </TabNav.Root>
    </nav>
  );
}

export default NavBar
