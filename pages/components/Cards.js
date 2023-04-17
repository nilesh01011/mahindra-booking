import Image from 'next/image'
import React from 'react'
import Buttons from './Buttons'

function Cards({ id, title, price, imgSrc, allDetails, theme }) {

    // spaces between number remove 'en-IN' add fr-FR
    const prices = new Intl.NumberFormat('en-IN').format(price);

    return (
        <div key={id} className={`xl:w-[380px] lg:w-full h-[337px] rounded-[10px] p-[15px] ${theme === "dark" ? 'bg-[#242424]' : 'bg-white'} shadow-md flex flex-col justify-between`}>
            {/* cars name and prices */}
            <div className='flex items-center justify-between'>
                <h1 className={`font-black sm:text-[18px] text-[16px] uppercase whitespace-nowrap ${theme === "dark" ? 'text-white' : 'text-black'}`}>{title}</h1>
                <div className='w-full h-full flex justify-end items-center sm:text-[16px] text-[14px] flex-wrap'>
                    <p className={`${theme === "dark" ? 'text-white' : 'text-black'} mr-1`}>Starts at</p>
                    <span className={`font-black ${theme === "dark" ? 'text-white' : 'text-black'}`}>₹{prices}*</span>
                </div>
            </div>
            {/* images src */}
            <div className='w-full h-[200px] flex items-center justify-center'>
                <Image src={imgSrc && imgSrc} alt={title} width={289} height={200} className="w-[289px] h-[200px] object-contain" />
            </div>
            {/* buttons */}
            <div className='w-full flex justify-center gap-[25px] h-[44px]'>
                <Buttons theme={theme} title="explore" outline={true} />
                <Buttons theme={theme} cardsItems={allDetails} links="/own-online/product-details" title="select" outline={false} />
            </div>
        </div>
    )
}

export default Cards