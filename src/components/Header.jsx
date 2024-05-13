'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import MobileNav from './MobileNav';

function Header() {
  const [header, setHeader] = useState(false);
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
              <Link href={'/'}>Menu</Link>
              <Link href={'/'}>About</Link>
              <Link href={'/'}>Contact</Link>
            </nav>
          
            {/* mobile nav */}
            <div className='xl:hidden'>
              <MobileNav />
            </div>
          </div>
          <nav className=' hidden xl:flex gap-8 items-center  text-gray-500 font-semibold'>
              <Link href={'/login'}>Login</Link>
              <Link href={'/'} className="bg-red-500 rounded-full text-white px-4 py-2">Register</Link>
            </nav>
        </div>
      </div>
    </header>

  )
}

export default Header

