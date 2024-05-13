import React from 'react'
import MenuCard from './MenuCard'

function PopularDishes() {
  return (
   <section className='container mx-auto mt-8'>
     <div className='text-center'>
        <h1 className='text-center text-4xl font-semibold '>Popular Dishes</h1>
        <p className='text-gray-500 mt-1'>Check out our most popular and highly-rated dishes.</p>
        <div className='grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 mt-8 gap-4'>
            <MenuCard/>
            <MenuCard/>
            <MenuCard/>
            <MenuCard/>
        </div>
     </div>
   </section>
  )
}

export default PopularDishes
