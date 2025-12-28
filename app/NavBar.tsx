'use client'

import React from 'react'
import Link from 'next/link'
import { IoBugSharp } from "react-icons/io5";
import { usePathname } from 'next/navigation';
import classnames from 'classnames';

const NavBar = () => {
    const currentPath = usePathname();

    const links = [
        { label: 'Dashboard', href: '/'},
        { label: 'Issues', href: '/issues'},
    ]

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href='/'><IoBugSharp /></Link>
        <ul className='flex space-x-6'>
            {links.map( (link) =>  <Link 
                key={link.href} 
                className={classnames({
                    'text-slate-900': link.href === currentPath,
                    'text-slate-500': link.href !== currentPath,
                    'hover:text-slate-800 transition-colors': true,
                })}
                href={link.href}> {link.label} </Link>)
            }
        </ul>
    </nav>
  );
}

export default NavBar
