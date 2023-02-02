import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import Buttons from '../../components/Buttons';
import DesktopViewSelectConfig from '../../components/DesktopViewSelectConfig';
import MobileViewSelectConfig from '../../components/MobileViewSelectConfig';
import Steppers from '../../components/Steppers'

function SelectConfigurations() {
    // theme changes
    const [theme, setTheme] = useState('');

    useEffect(() => {
        const themes = localStorage.getItem('theme');

        if (themes === "dark") {
            setTheme("dark")
        }

        if (themes === "light") {
            setTheme("light")
        }
    }, []);

    useEffect(() => {
        document.body.style.backgroundColor = `${theme === "light" ? '#F4F4F4' : '#0B0B0C'}`;
    }, [theme]);

    const handleSwitch = useRef();
    const [switchColor, setSwitchColor] = useState(false)
    const [switchValueChange, setSwitchValueChange] = useState(true)

    useEffect(() => {
        if (switchValueChange === false) {
            alert("Change to no button")
        }
    }, [switchValueChange]);

    const themeChangeColor = theme === "dark" ? 'text-white' : 'text-black';

    return (
        <>
            <Head>
                <title>Select-Configurations</title>
                <meta name="description" content="Product List" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className='w-full h-full pt-[10px] max-w-[1200px] mx-auto xl:px-0 px-[15px]'>
                {/* steppers */}
                <div className='w-full h-[30px] flex justify-center'>
                    <Steppers Steps={1} />
                </div>
                {/* contents */}
                <div className='w-full h-full mt-[30px]'>
                    {/* title and existing config */}
                    <div className='w-full flex md:flex-row flex-col md:gap-0 gap-[12px] justify-between md:items-end items-start'>
                        <h2 className={`font-black md:order-1 order-2 ${themeChangeColor}`}>Select Your Configuration</h2>
                        {/* existing config */}
                        <div className={`sm:w-[388px] w-full h-[46px] ${theme === "dark" ? 'bg-[#242424]' : 'bg-white'} rounded-[10px] flex items-center justify-between p-[12px] md:order-2 order-1`}>
                            {/* title */}
                            <span className={`sm:text-[14px] text-[12px] ${themeChangeColor}`}>Connect to existing Configuration</span>
                            {/* buttons */}
                            {/* Switch */}
                            <div className='flex items-center justify-center sm:gap-[20px] gap-[10px]'>
                                <span className={`sm:text-[16px] text-[14px] ${themeChangeColor}`}>Yes</span>
                                <div>
                                    <label className="relative w-[40px] h-[20px] flex items-center">
                                        <input onClick={() => { setSwitchColor(!switchColor), setSwitchValueChange(!switchValueChange) }} type="checkbox" className={`opacity-0 w-0 h-0`} />
                                        <span ref={handleSwitch} className={`${switchColor && 'before:translate-x-[17px]'} w-[38px] h-[21px] absolute cursor-pointer top-0 right-0 bottom-0 left-0 ${theme === "dark" ? 'bg-[#0B0B0C]' : 'bg-[#F4F4F4]'} rounded-full transition-all before:absolute before:content-[''] before:rounded-full before:h-[18px] before:w-[18px] before:top-[1.4px] before:left-[1.6px] before:bottom-[1.4px] before:bg-[#FF3E5B] before:transition-all`}></span>
                                    </label>
                                </div>
                                <span className={`sm:text-[16px] text-[14px] ${themeChangeColor}`}>No</span>
                            </div>
                        </div>
                    </div>

                    {/* configurations cards */}

                    <div className='w-full h-full flex flex-col gap-[20px] md:my-[20px] my-[18px]'>
                        {/* boxs 1 */}
                        {/* desktop view */}
                        <div className='slg:block hidden'>
                            <DesktopViewSelectConfig theme={theme} />
                        </div>
                        {/* mobile views */}
                        <div className='slg:hidden block'>
                            <MobileViewSelectConfig theme={theme} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SelectConfigurations