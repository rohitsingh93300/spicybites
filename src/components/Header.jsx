'use client'
import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import MobileNav from './MobileNav';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { CartContext } from './AppContext';
import ShoppingCart from "@/components/ShoppingCart"
import Bars from "@/components/Bars"


function AuthLinks({ status, userName }) {
  if (status === 'authenticated') {
    return (
      <>
        <Link href={'/profile'} className="whitespace-nowrap">
          Hello, {userName}
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-red-500 rounded-full text-white px-8 py-2 md:ml-2">
          Logout
        </button>
      </>
    );
  }
  if (status === 'unauthenticated') {
    return (
      <>
        <Link href={'/login'}>Login</Link>
        <Link href={'/register'} className="bg-red-500 rounded-full text-white px-8 py-2">
          Register
        </Link>
      </>
    );
  }
}

function Header() {
  const [header, setHeader] = useState(false);
  const session = useSession()
  const status = session.status
  const profile = session?.data?.user
  let userName = profile?.name || profile?.email;
  const email = profile?.email
  const image = profile?.image
  const name = email?.split('@')[0]
  const { cartProducts } = useContext(CartContext)
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }
  const path = usePathname()

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
        {/* MobileNav */}
        <div className='flex md:hidden justify-between'>
          <Link href="/" className="text-primary font-semibold flex gap-1">
            <Image src={'/chili-pepper.png'} width={24} height={24} alt='chilli' />
            <div className='text-red-500'>
              Spicy
              <span className="text-gray-800 font-semibold">Bites</span>
            </div>
          </Link>
          <div className='flex gap-8'>
            <Link href={'/cart'} className='relative ml-2'>
              <ShoppingCart />
              {cartProducts?.length > 0 && (

                <span className='absolute -top-2 -right-4 bg-red-500 text-white text-xs py-1 px-2 rounded-full leading-3'>{cartProducts.length}</span>
              )}
            </Link>
            <button className='' onClick={() => setMobileNavOpen(prev => !prev)}>
              <Bars />
            </button>
          </div>
        </div>
        {mobileNavOpen && (
        <div 
        onClick={()=> setMobileNavOpen(false)}
        className='md:hidden p-4  bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center'>
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'#about'}>About</Link>
          <Link href={'#contact'}>Contact</Link>
          <AuthLinks status={status} userName={userName}/> 
        </div>

        )}

        {/* computerNav */}
        <div className='hidden md:flex justify-between items-center'>
          <Link href="/" className="text-primary font-semibold flex gap-1">
            <Image src={'/chili-pepper.png'} width={24} height={24} />
            <div className='text-red-500'>
              Spicy
              <span className="text-gray-800 font-semibold">Bites</span>
            </div>
          </Link>
          <div className='flex items-center gap-x-6'>
            {/* nav */}
            <nav className="flex items-center gap-8 text-gray-500 font-semibold">
              <Link href={'/'}>Home</Link>
              <Link href={'/menu'}>Menu</Link>
              <Link href={'#about'}>About</Link>
              <Link href={'#contact'}>Contact</Link>
            </nav>


          </div>
          <nav className='flex items-center gap-1'>
            <AuthLinks status={status} userName={userName} />

            <Link href={'/cart'} className='relative ml-2'>
              <ShoppingCart />
              {cartProducts?.length > 0 && (

                <span className='absolute -top-2 -right-4 bg-red-500 text-white text-xs py-1 px-2 rounded-full leading-3'>{cartProducts.length}</span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>

  )
}

export default Header

