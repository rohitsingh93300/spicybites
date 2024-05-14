'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import MobileNav from './MobileNav';
import { signOut, useSession } from 'next-auth/react';

function Header() {
  const [header, setHeader] = useState(false);
  const session = useSession()
  console.log(session)
  const status = session.status
  useEffect(() => {
    const scrollYPos = window.addEventListener('scroll', () => {
      window.scrollY > 50 ? setHeader(true) : setHeader(false);
    });
    //remove event
    return () => window.removeEventListener('scroll', scrollYPos)
  })
  return (
    <header className={`sticky container mx-auto top-0 z-30 transition-all ${header ? 'py-4 bg-white shadow-lg ' : 'py-6'} `}>
      <div className=" ">
        <div className='flex justify-between items-center'>
          <Link href="/" className="text-primary font-semibold flex gap-1">
            <Image src={'/chili-pepper.png'} width={24} height={24} />
            <div className='text-red-500'>
              Spicy
              <span className="text-gray-800 font-semibold">Bites</span>
            </div>
          </Link>
          <div className='flex items-center gap-x-6'>
            {/* nav */}
            <nav className="hidden xl:flex items-center gap-8 text-gray-500 font-semibold">
              <Link href={'/'}>Home</Link>
              <Link href={'/menu'}>Menu</Link>
              <Link href={'/about'}>About</Link>
              <Link href={'/contact'}>Contact</Link>
            </nav>
          
            {/* mobile nav */}
            <div className='xl:hidden'>
              <MobileNav status={status} />
            </div>
          </div>
          {status === 'authenticated' && (
            <button onClick={()=>signOut()}  className="bg-red-500 rounded-full text-white px-4 py-2">Logout</button>
          )}
          {status === 'unauthenticated' && (
          <nav className=' hidden xl:flex gap-8 items-center  text-gray-500 font-semibold'>
              <Link href={'/login'}>Login</Link>
              <Link href={'/register'} className="bg-red-500 rounded-full text-white px-4 py-2">Register</Link>
            </nav>

          )}
        </div>
      </div>
    </header>

  )
}

export default Header

