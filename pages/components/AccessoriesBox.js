import Image from 'next/image'
import React, { useState } from 'react'

function AccessoriesBox({ theme, text, text2, price, handleActiveClick, id, setActiveBox }) {

    const prices = new Intl.NumberFormat('en-IN').format(price);

    const imgSrc = '/accessoriesImg.png'

    return (
        <>
            <div className='w-full relative max-h-[260px] shadow-md rounded-[10px]'>
                {/* absolutes */}
                <div className='absolute left-3 top-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" fill="#707070" />
                        <path d="M7.44824 12.4298V6.56317H8.43846V12.4298H7.44824ZM7.95579 5.35161C7.77605 5.35731 7.601 5.29366 7.4669 5.17383C7.40236 5.11646 7.3511 5.0457 7.31672 4.96648C7.28233 4.88726 7.26563 4.8015 7.26779 4.71517C7.26434 4.62775 7.28042 4.54066 7.31486 4.46024C7.3493 4.37982 7.40125 4.30809 7.4669 4.25028C7.60157 4.1314 7.77623 4.06789 7.95579 4.0725C8.13536 4.06789 8.31002 4.1314 8.44468 4.25028C8.51034 4.30809 8.56228 4.37982 8.59673 4.46024C8.63117 4.54066 8.64725 4.62775 8.64379 4.71517C8.64596 4.8015 8.62926 4.88726 8.59487 4.96648C8.56048 5.0457 8.50923 5.11646 8.44468 5.17383C8.31058 5.29366 8.13554 5.35731 7.95579 5.35161Z" fill="white" />
                    </svg>
                </div>

                {/* head sides */}
                <div className='max-w-full max-h-[184px] overflow-hidden'>
                    <Image width={286} height={200} src={imgSrc} alt="accessories-Img" className='w-full h-full object-contain rounded-[10px_10px_0_0]' />
                </div>

                {/* bottoms sides */}
                <div className={`relative w-full h-max rounded-[0_0_10px_10px] ${theme === "dark" ? 'bg-[#242424]' : 'bg-white'} p-[14px_12px] flex md:items-end md:flex-row md:gap-0 gap-[10px] flex-col md:justify-between`}>
                    <div className='h-full'>
                        <p className={`${theme === "dark" ? 'text-white' : 'text-black'} 1x1:text-[14px] text-[12px]`}>{text}</p>
                        <p className={`${theme === "dark" ? 'text-white' : 'text-black'} 1x1:text-[14px] text-[12px]`}>{text2}</p>
                    </div>
                    {/* prices */}
                    <div className='flex items-center gap-[6px]'>
                        <h2 className={`${theme === "dark" ? 'text-white' : 'text-black'} font-bold text-[16px]`}>₹{prices}</h2>

                    </div>

                    {/* add buttons */}
                    <div onClick={() => handleActiveClick(id)} className='absolute -top-[25%] right-3 h-[36px] w-[36px] rounded-full bg-white cursor-pointer flex items-center justify-center'>
                        {
                            id === 2 ? (
                                <div className='h-[19px] flex items-center justify-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="3" viewBox="0 0 18 3" fill="none">
                                        <rect width="18" height="3" fill="#FF3E5B" />
                                    </svg>
                                </div>
                            ) : (
                                <div className='h-[19px]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="21" viewBox="0 0 19 21" fill="none">
                                        <path d="M8.03805 20.353V11.873H0.123047V9.17302H8.03805V0.692017H10.865V9.17302H18.78V11.873H10.865V20.353H8.03805Z" fill="#FF3E5B" />
                                    </svg>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccessoriesBox