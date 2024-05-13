import Image from 'next/image'
import React from 'react'

function MenuCard() {
    return (
        <div className='border rounded-lg transition-all duration-500 hover:shadow-lg hover:bg-red-50/85 px-8'>
            <div className='flex items-center justify-center'>
                <Image src={'/hero-food.png'} width={150} height={200} />
            </div>
            <div className=''>
                <h2 className='font-bold '>Margherita Pizza</h2>
                <p className='text-xs text-gray-500'>Classic Italian pizza with tomato sauce, mozzarella, and basil.</p>
                <div className='flex justify-center px-4'>

                    <div className='flex items-center justify-center mt-1'>
                        <Image src={'/star.png'} width={15} height={10} />
                        <Image src={'/star.png'} width={15} height={10} />
                        <Image src={'/star.png'} width={15} height={10} />
                        <Image src={'/star.png'} width={15} height={10} />
                        <Image src={'/star-outline.png'} width={15} height={10} />
                    </div>
                   
                </div>
                <button className='bg-red-500 mt-3 mb-4 text-white px-4 py-2 rounded-full text-xs'>Order Now $4</button>
            </div>
        </div>
    )
}

export default MenuCard
