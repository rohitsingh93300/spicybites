'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import {signIn} from "next-auth/react"

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loader, setLoader] = useState(false)
    // const [userCreated, setUserCreated] = useState(false) 
    // const [error, setError] = useState(false)
    const handleFormSubmit = async(e)=>{
        e.preventDefault();
        await signIn('credentials',{email, password, callbackUrl:'/'})
    }
    return (
        <section className='pt-14 '>
          <div className='border-red-50 border max-w-md py-8 rounded-3xl shadow-sm shadow-red-100 mx-auto'>
          <h1 className='text-center text-4xl font-semibold '>Sign In</h1>
           <p className='text-gray-500 mt-1 text-center'>Enter your email and password to sign in.</p>
          {/* {userCreated && (
            <div className='my-4 text-center'>
              User created. Now you can <Link className='underline' href={'/login'}>Login &raquo;</Link>
            </div>
          )}
          {error && (
            <div className='my-4 text-center'>An error has occured.</div>
          )} */}
           <form 
           onSubmit={handleFormSubmit}
           className='block max-w-sm px-5 md:px-0 mx-auto mt-4'>
            <label className='text-start'>Email</label>
            <input 
            disabled={loader}
            onChange={(e)=>setEmail(e.target.value)}
            type='email' 
            placeholder='Email' 
            className='input' />
            <label className='text-start'>Password</label>
            <input 
            disabled={loader}
            onChange={(e)=>setPassword(e.target.value)}
            type='password' 
            placeholder='password' 
            className='input' />
            <button 
            disabled={loader}
            type='submit' 
            className='submit mt-4 button'>Sign In</button>
            <div className='my-4 text-center text-gray-500 '>or login with provider</div>
            <button className='flex w-full gap-4 justify-center border border-gray-300 rounded-xl px-6 py-2 '>
                <Image src={'/google.png'} width={24} height={24}/>
                Login with Google
            </button>
           </form>
           <p className='mt-4 text-gray-500 text-center '>Don't have an account?{" "}<Link href={'/register'} className='underline'>register</Link></p>
          </div>
        </section>
      )
}

export default LoginPage
