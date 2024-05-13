import Image from 'next/image'
import React from 'react'
import { Badge } from './ui/badge'

function KeyFeatures() {
  return (
    <section className='mt-10 bg-slate-100/85 pt-5'>
    <div className='container mx-auto'>
    <div className='grid grid-cols-1 gap-4 md:gap-0 md:grid-cols-2'>
        {/* image */}
        <div className='flex items-center justify-center relative '>
            <Image  src={'/chef.png'} width={200} height={200} alt='food' className='' />
            {/* <Badge variant="outline" className='border-none py-1 gap-1 text-lg  absolute top-2 left-16'>
            <Image src={'/baigan.png'} width={30} height={30} />
            </Badge>
            <Badge variant="outline" className='border-none gap-1 text-lg  absolute top-36 left-6'>
            <Image src={'/carrot.png'} width={30} height={30} />
            </Badge>
            <Badge variant="outline" className='border-none leading-none py-1 flex flex-col gap-1 text-lg  absolute top-0 right-20'>
            <Image src={'/chili-pepper.png'} width={30} height={30} />
            </Badge>
            <Badge variant="outline" className= 'py-1 leading-none flex flex-col border-none absolute top-16 left-0'>
            <Image src={'/tomato.png'} width={30} height={30} />
            </Badge>
            <Badge variant="outline" className= 'py-1 leading-none flex flex-col border-none absolute bottom-36 right-11'>
            <Image src={'/mushroom.png'} width={30} height={30} />
            </Badge>
            <Badge variant="outline" className= 'py-1 leading-none flex flex-col border-none absolute top-20 right-9'>
            <Image src={'/cabbage.png'} width={30} height={30} />
            </Badge> */}

        </div>
        {/* text */}
        
        <div className='flex flex-col gap-4 justify-center'>
       
            <h3 className='text-red-500'>Key Features</h3>
            <h1 className='text-4xl  font-semibold tracking-tight '>
            Enjoy a Seamless Ordering Experience
            </h1>
            <p className='text-gray-500'>From fast delivery to a wide selection of cuisines, our food ordering service has everything you need to satisfy your cravings.</p>
            <div className='flex gap-1 items-center pb-8 md:pb-0'>
                <Image src={'/playstore.png'} width={100} height={100} alt='playstore'/>
                <Image src={'/appstore.png'} width={100} height={100} alt='appstore'/>

            </div>
        </div>
    </div>
    </div>   
   </section>
  )
}

export default KeyFeatures
