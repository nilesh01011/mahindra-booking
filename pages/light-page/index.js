import Head from 'next/head';
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { TabsList } from '../api/CardList';
import Buttons from '../components/Buttons'
import Navbar from '../components/navbar/Navbar';

function Index() {

    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const element = document.documentElement;
        switch (theme) {
            case 'dark':
                element.classList.add('dark');
                localStorage.setItem('theme', "dark");
                setTheme('dark');
                break;
            case 'light':
                element.classList.remove('dark');
                localStorage.setItem('theme', "light");
                setTheme('light');
                break;

            default:
                break;
        }
    }, [theme])

    // theme change End

    const [getCarDetails, setCarDetails] = useState([]);

    useEffect(() => {
        const carDetails = TabsList.map((ele) => {

            if (ele.title === "SUVs") {

                ele.carsList.map((el) => {

                    if (el.title === 'Thar') {

                        setCarDetails(el)
                    }
                })
            }
        })
    }, [])

    const handleCarSelect = () => {
        localStorage.setItem('cardsDetails', JSON.stringify(getCarDetails))
    }

    const carBannerImage = getCarDetails ? getCarDetails.bgImg : null;

    // landing pages images

    const landingImages = getCarDetails ? getCarDetails.ladingPageImg : null;

    useEffect(() => {
        document.body.style.backgroundColor = "#F4F4F4"
    })

    return (
        <>
            <Head>
                <title>Thar</title>
                <meta name="description" content="Product List" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar theme={theme} />

            <div className='w-full h-full'>
                {/* banners */}
                <div className='w-full h-[100vh - 70px] relative'>
                    <Link onClick={handleCarSelect} href='/own-online/product-details' className='w-full md:h-[400px] h-[500px]'>
                        {
                            carBannerImage &&
                            <Image height={500} width={1280} src={carBannerImage} alt="banner-img" className='w-full h-full object-cover' />
                        }
                    </Link>

                    <div className='absolute right-[20%] xl:bottom-[25%] lg:bottom-[20%] bottom-[10%] h-[44px] md:block hidden'>
                        {/* <button onClick={() => handleSubmits()} type="button" className={`sm:text-[18px] text-[15px] text-white relative z-[5] capitalize xl:w-[170px] md:w-[150px] w-[120px] h-[50px] before:content-[""] before:absolute before:left-0 before:right-0 before:bottom-0 before:top-0 before:md:w-[170px] before:w-[122px] before:h-[50px] before:border-[1px] ${theme === "dark" ? ' text-white' : ' text-black hover:text-white'} before:bg-[#ff3e5b] before:border-[#ff3e5b] before:z-[-1] after:content-[""] after:absolute after:md:right-[-8px] after:right-[-10px] after:bottom-0 after:top-0 after:bg-[#ff3e5b] after:w-[4px] after:h-[50px] font-bold
                        `}
                        >
                            Book now
                            <style jsx>
                                {`
                                button::after,
                                button:before {
                                    transform:skew(-13deg);
                                }
                            `}
                            </style>
                        </button> */}
                        <Buttons links='/own-online/product-details' cardsItems={getCarDetails} theme={theme} title="Book now" outline={false} setWidth={200} setHeight={50} />

                    </div>
                </div>

                {/* landing images */}

                <div className='max-w-[1200px] mx-auto xl:px-0 px-[15px]'>
                    <div className='w-full h-full md:py-[40px] py-[20px]'>
                        {/* titles */}
                        <div className='w-full'>
                            <h2 className='pl-[15px] uppercase text-[18px] font-bold relative before:content-[""] before:absolute before:left-0 before:top-[6%] before:w-[2px] before:h-[80%] before:bg-[#ce0e2d]'>
                                explore thar

                                <style jsx>
                                    {`
                                    h2:before {
                                        transform:skew(-13deg);
                                    }
                                `}
                                </style>
                            </h2>
                        </div>

                        {/* landing pages content 1 */}
                        <div className='w-full md:mt-[30px] flex lg:flex-row flex-col gap-[20px] items-center py-[20px]'>
                            {/* left sides */}
                            <div className='lg:w-1/2'>
                                <div className='lg:w-[90%]'>
                                    <h2 className='md:text-[36px] text-[24px] font-black'>Here is where the impossible begins</h2>
                                    <p className='md:text-[18px] text-[14px] sm:mt-[15px] mt-[10px]'>An enduring icon that just keeps on giving, The All-New Thar comes equipped with the iconic design and all new interiors to help you Explore The Impossible</p>
                                    <div className='w-full flex justify-start gap-[25px] h-[44px] mt-[30px]'>
                                        <Buttons theme={theme} title="exquire now" outline={true} setWidth={200} />
                                        <Buttons theme={theme} title="test drive" outline={false} setWidth={200} />
                                    </div>
                                </div>
                            </div>
                            {/* right sides */}
                            <div className='lg:w-1/2 md:h-[300px] h-[240px] md:mt-0 mt-[10px]'>
                                {
                                    landingImages &&
                                    <Image height={400} width={1280} src={landingImages} alt="banner-img" className='w-full h-full object-contain' />
                                }
                            </div>
                        </div>
                    </div>

                    <div className='w-full h-full md:pt-[40px]'>
                        {/* titles */}
                        <div className='w-full'>
                            <h2 className='pl-[15px] uppercase text-[18px] font-bold relative before:content-[""] before:absolute before:left-0 before:top-[6%] before:w-[2px] before:h-[80%] before:bg-[#ce0e2d]'>
                                explore thar

                                <style jsx>
                                    {`
                                    h2:before {
                                        transform:skew(-13deg);
                                    }
                                `}
                                </style>
                            </h2>
                        </div>
                        {/* landing pages content 2 */}
                        <div className='w-full md:mt-[30px] flex lg:flex-row flex-col gap-[20px] items-center py-[20px]'>
                            {/* left sides */}
                            <div className='lg:w-1/2 md:h-[300px] h-[240px] lg:order-1 order-2'>
                                {
                                    landingImages &&
                                    <Image height={400} width={1280} src={landingImages} alt="banner-img" className='w-full h-full object-contain' />
                                }
                            </div>
                            {/* right sides */}
                            <div className='lg:w-1/2 lg:order-2 order-1 md:mb-0 mb-[10px]'>
                                <div className='lg:w-[90%]'>
                                    <h2 className='md:text-[36px] text-[24px] font-black'>Here is where the impossible begins</h2>
                                    <p className='md:text-[18px] text-[14px] sm:mt-[15px] mt-[10px]'>An enduring icon that just keeps on giving, The All-New Thar comes equipped with the iconic design and all new interiors to help you Explore The Impossible</p>
                                    <div className='w-full flex justify-start gap-[25px] h-[44px] mt-[30px]'>
                                        <Buttons theme={theme} title="exquire now" outline={true} setWidth={200} />
                                        <Buttons theme={theme} title="test drive" outline={false} setWidth={200} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index