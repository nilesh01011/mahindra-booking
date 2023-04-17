import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { TabsList } from '../api/CardList'
import Cards from '../components/Cards'
import Navbar from '../components/navbar/Navbar'
import SelectStateCity from '../components/SelectStateCity'
import Steppers from '../components/Steppers'
// import TabsContent from '../components/TabsContent'

function ModelListSelection() {

    const [theme, setTheme] = useState('');

    useEffect(() => {
        const themes = localStorage.getItem('theme');

        if (themes === "dark") {
            setTheme("dark")
        }

        if (themes === "light") {
            setTheme("light")
        }
    }, [])

    useEffect(() => {
        document.body.style.backgroundColor = `${theme === "light" ? '#F4F4F4' : '#0B0B0C'}`
    }, [theme])

    const [toggleState, setToggleState] = useState(1);

    const [carsListBody, setCarsListBody] = useState([])

    const toggleTabs = (e) => {
        setToggleState(e)
        setCarsListBody([])
    }


    useEffect(() => {
        TabsList.map((el) => {
            toggleState === el.id && el.carsList.map((ele) => {
                setCarsListBody(el.carsList)
            })
        })

    }, [toggleState, carsListBody]);

    return (
        <>
            <Head>
                <title>Mahindra SUV Models in India</title>
                <meta name="description" content="Mahindra SUV Models Product List" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* main content */}

            <Navbar theme={theme} />

            <main className='w-full h-full pb-[10px] max-w-[1206px] mx-auto'>
                <div className='w-full h-full xl:px-0 px-[15px]'>
                    {/* fixed left-0 right-0 */}
                    <div className={`z-20 w-full h-full md:pt-[10px] sticky top-[67px] ${theme === "dark" ? 'bg-[#0B0B0C]' : 'bg-[#F4F4F4]'}`}>
                        {/* steppers */}
                        <div className='w-full h-[30px] flex justify-center'>
                            <Steppers Steps={1} />
                        </div>
                        {/* ex-showroom placement button */}
                        <div className='sm:mb-[15px] sm:mt-[45px] mt-[32px] mb-[10px] z-50'>
                            <SelectStateCity theme={theme} />
                        </div>
                        {/* tabs */}
                        <div className='w-full h-full'>
                            <div className='w-full h-max flex items-center justify-center'>
                                {
                                    TabsList.map((ele) => {
                                        const { id, title } = ele
                                        return (
                                            <button key={id} type='button' onClick={() => toggleTabs(id)} className={`relative ${toggleState === id ? 'font-bold' : 'font-[400]'} ${theme === "dark" ? 'text-white' : 'text-black'} sm:w-[107px] w-full ${ele.length}`}>
                                                {title}
                                                <span className={`absolute bottom-[-5px] left-0 w-full h-[2px] ${toggleState === id ? 'bg-[#FF3E5B]' : 'bg-[#FF3E5B] opacity-[20%]'}`}></span>
                                            </button>
                                        )
                                    })
                                }
                            </div>
                            {/* content body */}
                            <div className='w-full h-full'>
                                {/* title */}
                                <h1 className={`${theme === "dark" ? 'text-white' : 'text-black'} sm:text-[26px] text-[20px] font-bold sm:mt-[12px] mt-[18px] sm:pb-[20px] pb-[15px]`}>Select Vehicle</h1>
                            </div>

                        </div>
                    </div>
                    {/* cards contents */}
                    <div className='w-full h-full mb-[10px] max-w-[1200px] mx-auto px-[2px]'>
                        <div className='w-full h-full grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[20px] items-center'>
                            {
                                carsListBody.map((ele) => {
                                    return <Cards key={ele.id} {...ele} allDetails={ele} theme={theme} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ModelListSelection