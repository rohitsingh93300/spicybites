'use client'
import Image from 'next/image'
import React, { useState } from 'react'

function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleFormSubmit = async(e)=>{
        e.preventDefault();
        fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type':'application/json'}
        });
    }
  return (
    <section className='pt-14 '>
      <div className='border-red-50 border max-w-md py-8 rounded-3xl shadow-sm shadow-red-100 mx-auto'>
      <h1 className='text-center text-4xl font-semibold '>Register</h1>
       <p className='text-gray-500 mt-1 text-center'>Enter your information to create an account.</p>
       <form 
       onSubmit={handleFormSubmit}
       className='block max-w-sm px-5 md:px-0 mx-auto mt-4'>
        <label className='text-start'>Email</label>
        <input 
        onChange={(e)=>setEmail(e.target.value)}
        type='email' 
        placeholder='Email' 
        className='input' />
        <label className='text-start'>Password</label>
        <input 
        onChange={(e)=>setPassword(e.target.value)}
        type='password' 
        placeholder='password' 
        className='input' />
        <button type='submit' className='submit mt-4 button'>Register</button>
        <div className='my-4 text-center text-gray-500 '>or login with provider</div>
        <button className='flex w-full gap-4 justify-center border border-gray-300 rounded-xl px-6 py-2 '>
            <Image src={'/google.png'} width={24} height={24}/>
            Login with Google
        </button>
       </form>
       <p className='mt-4 text-gray-500 text-center'>Already have an account?{" "}<span className='underline'>Login</span></p>
      </div>
    </section>
  )
}

export default RegisterPage
