import Image from 'next/image'
import React from 'react'
import Buttons from './Buttons'

function MobileViewSelectConfig({ theme }) {
    const imgSrc = '/image-10.png';
    const themeChangeColor = theme === "dark" ? 'text-white' : 'text-black';

    return (
        <>
            <div className={`w-full h-max ${theme === "dark" ? 'bg-[#242424]' : 'bg-white'} rounded-[10px] p-[20px] flex flex-col`}>
                {/* title and images */}
                <div className='w-full'>
                    {/* title */}
                    <div className='w-full pb-[12px]'>
                        <h2 className={`flex md:flex-row flex-col ${themeChangeColor}`}>
                            <span className={`font-black ${themeChangeColor}`}>Xuv700</span>
                            <ul className='flex items-center justify-start flex-wrap sm:gap-x-[8px] gap-x-[6px]'>
                                <li className='w-max list-none'>W8</li>
                                <li className='w-max flex items-center sm:gap-[8px] gap-[6px] break-words'>
                                    <span className={`w-[6px] h-[6px] ${theme === "dark" ? 'bg-white' : 'bg-black'} rounded-full `}></span>
                                    Petrol</li>
                                <li className='w-max flex items-center sm:gap-[8px] gap-[6px] break-words'>
                                    <span className={`w-[6px] h-[6px] ${theme === "dark" ? 'bg-white' : 'bg-black'} rounded-full `}></span>
                                    Automatic</li>
                                <li className='w-max flex items-center sm:gap-[8px] gap-[6px] break-words'>
                                    <span className={`w-[6px] h-[6px] ${theme === "dark" ? 'bg-white' : 'bg-black'} rounded-full `}></span>
                                    Sunburst Orange</li>
                            </ul>
                        </h2>
                    </div>
                    <div className='w-full flex items-center justify-center'>
                        <div className='w-[280px] sm:h-[194px] h-[188px]'>
                            <Image height={194} width={280} src={imgSrc} alt="img" className='w-full h-full object-contain' />
                        </div>
                    </div>
                </div>
                {/* right side contents */}
                <div className='w-full divide-y-[1px] divide-[#8E8585]'>

                    {/* dealer | city | showroom */}
                    <div className='w-full grid grid-cols-1 pb-[12px] divide-y-[1px] divide-[#8E8585]'>
                        {/* last updates */}
                        <div className='w-max pb-[12px]'>
                            <span className={`text-[12px] ${themeChangeColor}`}>Last Modified: 11/12/2021</span>
                        </div>

                        {/* dealer */}
                        <div className='w-full py-[12px]'>
                            {/* title */}
                            <span className={`${themeChangeColor}`}>Dealer</span>
                            {/* dealer names */}
                            <p className={`${themeChangeColor} flex sm:flex-col flex-row flex-wrap font-black mt-[4px] leading-[24px]`}>
                                <span>DealerRandhawa Motors</span>
                                <span>(A Div Of Randhawa </span>
                            </p>
                        </div>

                        {/* city registers */}
                        <div className='w-full py-[12px]'>
                            {/* title */}
                            <span className={`${themeChangeColor}`}>City of Registeration</span>
                            {/* dealer names */}
                            <p className={`flex sm:flex-col flex-row font-black mt-[4px] leading-[24px] ${themeChangeColor}`}>
                                <span>Pune</span>
                            </p>
                        </div>

                        {/* showroom */}
                        <div className='w-full pt-[12px]'>
                            {/* title */}
                            <span className={`${themeChangeColor}`}>Ex-showroom Price</span>
                            {/* dealer names */}
                            <p className={`flex sm:flex-col flex-row font-black mt-[4px] leading-[24px]`}>
                                <span>₹11 90 000.00</span>
                            </p>
                        </div>
                    </div>
                    {/* last updates and buttons */}
                    <div className='w-full flex flex-col gap-[15px] items-center justify-between pt-[12px]'>
                        <div className='w-max h-[44px] sm:mr-[5px]'>
                            <Buttons title='select' outline={true} setWidth={148} theme={theme} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MobileViewSelectConfig