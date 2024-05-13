import React from 'react'
// import FooterBg from "public/FooterImg.jpg"
import Image from 'next/image'


// const backgroundStyle = {
//     backgroundImage: 'url(${FooterBg})',
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//     backgroundSize: "cover",
//     height: "100%",
//     width: "100%",
// }

function Footer() {
  return (
    <section className='mt-12 container mx-auto bg-slate-100'>
      {/* <Image className='relative w-full' src={'/FooterImg.jpg'} layout='fill' objectFit='contain'/> */}
      <p className='text-center text-sm text-gray-500 p-4'>@2024 Rohit singh. All right reserved.</p>
    </section>
  )
}

export default Footer
