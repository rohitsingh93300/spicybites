'use client'
import Image from 'next/image'
import React from 'react'
import { Badge } from "../components/ui/badge"

function Hero() {
    return (
        <section className='mt-10'>
            <div className='container mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2'>
                    {/* text */}

                    <div className='flex flex-col gap-4 justify-center text-center md:text-left md:items-start items-center'>
                        <div>
                            <h1 className='text-3xl md:text-4xl mt-2 font-semibold tracking-normal  md:tracking-tight leading-none md:leading-7'>
                                <span className='inline-block  '>
                                    Delicious
                                    <Image className='relative -top-1' src={'/underline.png'} width={150} height={10} alt='underline' />
                                </span>
                                Meals Delivered to Your Doorsteps.
                            </h1>
                            <p className='text-gray-500'>Discover a world of culinary delights with our food delivery service. Enjoy fast, reliable delivery and a wide selection of mouthwatering dishes.</p>
                        </div>
                        <div className=' flex gap-2 w-full h-[45px]'>
                            <button className=' primary rounded-full px-0 flex items-center '>Order Now
                                <Image src={'/right-arrow.png'} height={18} width={18} />
                            </button>
                            <button className='bg-gray-300 hover:bg-white border flex px-2 items-center gap-1   rounded-full  delay-75'>Contact Now
                                <Image src={'/contact.png'} height={18} width={18} />
                            </button>
                        </div>



                    </div>
                    {/* image */}
                    <div className='flex items-center justify-center relative'>
                        <Image src={'/hero-food.png'} width={400} height={500} alt='food' className='spin w-[265px] md:w-[400px]' />
                        <Badge variant="outline" className='bg-red-50 gap-1 text-lg  absolute bottom-16 right-4'>
                            <Image src={'/time.png'} width={25} height={25} />
                            <p className='leading-4 text-sm'>Super Fast<br /> Delivery</p>
                        </Badge>
                        <Badge variant="outline" className='bg-red-50 leading-none py-1 flex flex-col gap-1 text-lg  absolute top-10 right-4'>
                            <p className='leading-4 text-sm'>Average Rating</p>
                            <div className='flex'>
                                <Image src={'/star.png'} width={15} height={15} alt='star'/>
                                <Image src={'/star.png'} width={15} height={15} alt='star'/>
                                <Image src={'/star.png'} width={15} height={15} alt='star'/>
                                <Image src={'/star.png'} width={15} height={15} alt='star'/>
                                <Image src={'/star-outline.png'} width={15} height={15} alt='star'/>

                            </div>
                        </Badge>
                        <Badge variant="outline" className='py-1 leading-none flex flex-col bg-red-50 absolute top-16 left-4'>
                            {/* <Image src={'/restaurant.png'} width={28} height={25} /> */}
                            <p className='leading-none text-red-500 text-xl'>100+ </p>
                            <p className=' text-sm'>Restaurants </p>
                        </Badge>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
