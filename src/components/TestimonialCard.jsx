import Image from 'next/image'
import React from 'react'

function TestimonialCard() {
  return (
    
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <div className="flex items-center justify-center gap-1">
              <div className="">
                <Image alt="shadcn" src="/tomato.png" width={20} height={10} />
              </div>
              <div className="">
                <div className="font-semibold">Sarah Johnson</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">CEO, Acme Inc</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500 leading-snug">
              “The customer service I received was exceptional. The support team went above and beyond to address my
              concerns.”
            </p>
          </div>
         
 
  )
}

export default TestimonialCard
