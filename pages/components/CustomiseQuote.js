import React from 'react'
import Buttons from './Buttons'

function CustomiseQuote({ theme, icons, text, link, cardDetails, getSelectedDealer }) {
    const urlLinks = link ? link : '';

    return (
        <>
            <div className={`${theme === "dark" ? 'bg-[#242424]' : 'bg-white'} h-[64px] rounded-[10px] p-[20px] flex items-center justify-between shadow-md`}>
                {/* text and icons */}
                <div className='flex items-center gap-[17px]'>
                    {/* icons */}
                    <div className='w-[28px] flex items-center justify-center'>
                        {icons}
                    </div>
                    {/* text */}
                    <h2 className={`${theme === "dark" ? 'text-white' : 'text-black'} md:text-[18px] tetx-[16px] font-bold`}>{text}</h2>
                </div>

                {/* buttons */}
                <div className="h-[44px] flex items-center justify-center gap-8">
                    {/* links to go a availables */}
                    {/* enter this props => links="/own-online/finance/summary" */}
                    <Buttons cardsItems={cardDetails} dealersId={getSelectedDealer} links={urlLinks} theme={theme} title="avail" outline={true} />
                </div>
            </div>
        </>
    )
}

export default CustomiseQuote