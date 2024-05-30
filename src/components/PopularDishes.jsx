'use client'
import React, { useEffect, useState } from 'react'
import MenuCard from './MenuCard'

function PopularDishes() {
  const [bestSellers, setBestSellers] = useState([])

  useEffect(()=>{
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItem => {
       const bestSeller = menuItem.slice(0,3)
       setBestSellers(bestSeller)
      })
    })
  },[])
  return (
   <section className='container mx-auto mt-8'>
     <div className='text-center'>
        <h1 className='text-center text-4xl font-semibold '>Popular Dishes</h1>
        <p className='text-gray-500 mt-1'>Check out our most popular and highly-rated dishes.</p>
        <div className='grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 mt-8 gap-4'>
           {bestSellers?.length > 0 && bestSellers.map((item, index) => (
            <MenuCard key={index} {...item} />
           ))}
        </div>
     </div>
   </section>
  )
}

export default PopularDishes
