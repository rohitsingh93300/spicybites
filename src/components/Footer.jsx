import React from 'react'
// import FooterBg from "public/FooterImg.jpg"



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
      <div className='flex items-center justify-between'>
      <p className='text-center text-sm text-gray-500 p-4'>@2024 Rohit singh. All right reserved.</p>
      <p>Designed By <a href="https://www.webelitebuilders.com">Webelite Builders</a></p>
      </div>
     
    </section>
  )
}

export default Footer
