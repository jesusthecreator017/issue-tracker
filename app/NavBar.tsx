import React from 'react'
import Link from 'next/link'
import { IoBugSharp } from "react-icons/io5";

const NavBar = () => {
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
                className='text-slate-100 hover:text-zinc-400 transition-colors:'
                href={link.href}>
                    {link.label}
                </Link>)
            }
        </ul>
    </nav>
  );
}

export default NavBar
