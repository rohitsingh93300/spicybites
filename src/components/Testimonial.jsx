import React from 'react'
import TestimonialCard from './TestimonialCard'

function Testimonial() {
  return (
    <section className='container mx-auto mt-8'>
     <div className='text-center'>
        <h1 className='text-center text-4xl font-semibold '>What Our Customers Say</h1>
        <p className='text-gray-500 mt-1'>Hear from our satisfied customers about their experience with our products and services.</p>
        <div className='mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            <TestimonialCard/>
            <TestimonialCard/>
            <TestimonialCard/>
            <TestimonialCard/>
            <TestimonialCard/>
            <TestimonialCard/>
        </div>
     </div>
   </section>
  )
}

export default Testimonial
