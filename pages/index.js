import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import MobileNavbar from './components/navbar/MobileNavbar'
import Navbars from './components/navbar/Navbars'

export default function Home() {

  useEffect(() => {
    document.body.style.backgroundColor = "#F4F4F4"
  })

  return (
    <>
      <Head>
        <title>Mahindra</title>
        <meta name="description" content="Product List" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* navbar tabs */}

      <main className='w-full h-full'>

        <div className='lg:block hidden'>
          <Navbars />
        </div>

        <div className='lg:hidden block'>
          <MobileNavbar theme={"dark"} />
        </div>

        <div className='w-full h-full'>
          <Image height={400} width={1280} src='/banner.webp' alt="img" className='w-full h-full' />
        </div>
        {/* titles */}

        <div className='py-[20px]'>
          <h1 className='md:text-[38px] sm:text-[28px] text-[18px] font-black text-center text-black'>Quick Actions</h1>
        </div>
      </main>
    </>
  )
}
