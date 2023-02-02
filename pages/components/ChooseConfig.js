import React, { useState } from 'react'

function ChooseConfig({ title, contentOne, contentTwo, theme }) {
    const [isActive, setIsActive] = useState(1)
    return (
        <>
            <div className={`w-full h-[120px] rounded-[10px] ${theme === "dark" ? 'bg-[#242424]' : 'bg-white'} p-[8px] shadow-md`}>
                {/* title */}
                <div className='w-full border-b-[1px] border-[#8E8585] pb-[4px] text-center'>
                    <h4 className={`${theme === "dark" ? 'text-white' : 'text-black'} font-bold capitalize sm:text-[16px] text-[14px]`}>{title}</h4>
                </div>
                {/* buttons */}
                <div className='w-full pt-[8px] flex gap-[8px] flex-col'>
                    <button onClick={() => setIsActive(1)} type='button' className={`sm:text-[16px] text-[12px] capitalize w-full h-[28px] rounded-[16px] ${isActive === 1 ? `text-[#0B0B0C] ${theme === "dark" ? 'bg-white' : 'bg-[#DEDEDE]'}` : `border-[1px] ${theme === "dark" ? 'border-white text-white' : 'border-[#DEDEDE] text-[#0B0B0C]'}`}`}>{contentOne}</button>
                    <button onClick={() => setIsActive(2)} type='button' className={`sm:text-[16px] text-[12px] capitalize w-full h-[28px] rounded-[16px] ${isActive === 2 ? `text-[#0B0B0C] ${theme === "dark" ? 'bg-white' : 'bg-[#DEDEDE]'}` : `border-[1px] ${theme === "dark" ? 'border-white text-white' : 'border-[#DEDEDE] text-[#0B0B0C]'}`}`}>{contentTwo}</button>
                </div>
            </div>
        </>
    )
}

export default ChooseConfig