import Image from 'next/image'
import React from 'react'

function RegisterPage() {
  return (
    <section className='mt-14'>
      <h1 className='text-center text-4xl font-semibold '>Register</h1>
       <p className='text-gray-500 mt-1 text-center'>Enter your information to create an account.</p>
       <form className='block max-w-sm mx-auto mt-4'>
        <label className='text-start'>Email</label>
        <input type='email' placeholder='Email' className='input' />
        <label className='text-start'>Password</label>
        <input type='password' placeholder='password' className='input' />
        <button type='submit' className='submit'>Register</button>
        <div className='my-4 text-center text-gray-500'>or login with provider</div>
        <button className='flex gap-4 justify-center'>
            <Image src={'/google.png'} width={24} height={24}/>
            Login with Google</button>
       </form>
    </section>
  )
}

export default RegisterPage
