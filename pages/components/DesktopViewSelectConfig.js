import Image from 'next/image'
import React from 'react'
import Buttons from './Buttons'

function DesktopViewSelectConfig({ theme }) {
    const imgSrc = '/image-10.png';
    const themeChangeColor = theme === "dark" ? 'text-white' : 'text-black';

    return (
        <>
            <div className={`w-full md:h-[239px] h-max ${theme === "dark" ? 'bg-[#242424]' : 'bg-white'} rounded-[10px] p-[20px] flex md:flex-row flex-col gap-[16px]`}>
                {/* left side images */}
                <div className='md:w-[25%] w-full flex items-center justify-center'>
                    <div className='w-[270px] h-[180px]'>
                        <Image height={180} width={270} src={imgSrc} alt="img" className='w-full h-full object-contain' />
                    </div>
                </div>
                {/* right side contents */}
                <div className='md:w-[75%] w-full divide-y-[1px] divide-[#8E8585]'>
                    {/* title */}
                    <div className='w-full pb-[12px]'>
                        <h2 className={`font-bold flex md:flex-row flex-col gap-[5px] ${themeChangeColor}`}>
                            <span>Xuv700</span>
                            <span>• W8 • Petrol • Automatic • Sunburst Orange</span>
                        </h2>
                    </div>
                    {/* dealer | city | showroom */}
                    <div className='w-full grid md:grid-cols-3 grid-cols-1 py-[12px] md:divide-y-0 divide-y-[1px] divide-[#8E8585]'>
                        {/* dealer */}
                        <div className='w-full md:pb-0 pb-[12px]'>
                            {/* title */}
                            <span className={`${themeChangeColor}`}>Dealer</span>
                            {/* dealer names */}
                            <p className={`flex sm:flex-col flex-row flex-wrap font-black mt-[4px] leading-[24px] ${themeChangeColor}`}>
                                <span>DealerRandhawa Motors</span>
                                <span>(A Div Of Randhawa) </span>
                            </p>
                        </div>

                        {/* city registers */}
                        <div className='w-full md:py-0 py-[12px]'>
                            {/* title */}
                            <span className={`${themeChangeColor}`}>City of Registeration</span>
                            {/* dealer names */}
                            <p className={`flex sm:flex-col flex-row font-black mt-[4px] leading-[24px] ${themeChangeColor}`}>
                                <span>Pune</span>
                            </p>
                        </div>

                        {/* showroom */}
                        <div className='w-full md:pt-0 pt-[12px]'>
                            {/* title */}
                            <span className={`${themeChangeColor}`}>Ex-showroom Price</span>
                            {/* dealer names */}
                            <p className={`${themeChangeColor}`}>
                                <span>₹11 90 000.00</span>
                            </p>
                        </div>
                    </div>
                    {/* last updates and buttons */}
                    <div className='w-full flex md:flex-row flex-col md:gap-0 gap-[15px] items-center justify-between pt-[12px]'>
                        {/* last updates */}
                        <div className='w-max'>
                            <span className={`text-[12px] ${themeChangeColor}`}>Last Modified: 11/12/2021</span>
                        </div>
                        <div className='w-max h-[44px] sm:mr-[5px]'>
                            <Buttons title='select' outline={true} theme={theme} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DesktopViewSelectConfig