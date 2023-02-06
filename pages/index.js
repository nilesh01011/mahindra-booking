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
          <Image height={400} width={1280} src='/banner.webp' alt="img" className='w-full h-full' priority={400} />
        </div>
        {/* titles */}

        <div className='py-[20px] max-w-[1200px] mx-auto md:px-0 px-[15px]'>
          <h1 className='md:text-[38px] sm:text-[28px] text-[18px] font-black text-center text-black'>Quick Actions</h1>

          {/* ouicks actions */}

          <div id='boxs' className='w-full md:h-[400px] h-full flex items-center flex-col bg-white mb-[30px]'>
            <div className='w-full md:h-[200px] h-full flex md:flex-row flex-col items-center justify-center '>
              {/* box 1 */}
              <div className='box w-full h-[200px] flex items-center justify-center md:border-[1px] border-0 md:border-black md:border-l-0 md:border-t-0'>
                <div className='flex items-center justify-center gap-[20px] px-[10px]'>
                  {/* images */}
                  <div className='h-full w-[65px]'>
                    <Image id='img1' src="/dealerDarkImg.png" width={65} height={66} alt="images" />
                    <Image id='img2' src="/dealerLightImg.png" width={65} height={66} alt="images" />
                  </div>
                  {/* details */}
                  <div className='deatils'>
                    <p>Your first step towards adventure</p>
                    <button type='button' className='p-[8px_20px_9px_20px] font-black text-[14px] capitalize'>Locate A Dealer</button>
                  </div>
                </div>
              </div>

              {/* box 2 */}
              <div className='box w-full h-[200px] flex items-center justify-center md:border-[1px] border-0 md:border-black md:border-l-0 md:border-t-0 md:border-r-0'>
                <div className='flex items-center justify-start gap-[20px] w-[318px] px-[10px]'>
                  {/* images */}
                  <div className='h-full w-[65px]'>
                    <Image id='img1' src="/testDarkImg.png" width={65} height={66} alt="images" />
                    <Image id='img2' src="/textLightImg.png" width={65} height={66} alt="images" />
                  </div>
                  {/* details */}
                  <div className='deatils'>
                    <p>Experience the thrill</p>
                    <button type='button' className='p-[8px_20px_9px_20px] font-black text-[14px] capitalize'>Book a test drive</button>
                  </div>
                </div>
              </div>
            </div>

            <div className='w-full md:h-[200px] h-full flex md:flex-row flex-col items-center justify-center '>
              {/* box 3 */}
              <div className='box w-full h-[200px] flex items-center justify-center md:border-[1px] border-0 md:border-black md:border-l-0 md:border-t-0 md:border-b-0'>
                <div className='flex items-center justify-center gap-[20px] px-[20px]'>
                  {/* images */}
                  <div className='h-full w-[65px]'>
                    <Image id='img1' src="/buyDarkImg.png" width={65} height={66} alt="images" />
                    <Image id='img2' src="/buyLightImg.png" width={65} height={66} alt="images" />
                  </div>
                  {/* details */}
                  <div className='deatils'>
                    <p>Your first step towards adventure</p>
                    <button type='button' className='p-[8px_20px_9px_20px] font-black text-[14px] capitalize'>buy online</button>
                  </div>
                </div>
              </div>

              {/* box 4 */}
              <div className='box w-full h-[200px] flex items-center justify-center md:border-[1px] border-0 md:border-black md:border-l-0 md:border-t-0 md:border-r-0 md:border-b-0'>
                <div className='flex items-center justify-center gap-[20px] px-[20px]'>
                  {/* images */}
                  <div className='h-full w-[65px]'>
                    <Image id='img1' src="/callDarkImg.png" width={65} height={66} alt="images" />
                    <Image id='img2' src="/callLightImg.png" width={65} height={66} alt="images" />
                  </div>
                  {/* details */}
                  <div className='deatils'>
                    <p>Your first step towards adventure</p>
                    <button type='button' className='p-[8px_20px_9px_20px] font-black text-[14px] capitalize'>request a call back</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  )
}
