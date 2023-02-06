import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function DisclaimerPopup({ theme }) {
    const [showroomPlace, setShowroomPlace] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsOpen(true)
        }, 1500)
    }, [isOpen])

    const handleClicks = () => {
        setShowroomPlace(true)
        document.body.style.overflow = "hidden";
        document.querySelector("#navbar").style.zIndex = '-1'
    }

    const handleClose = () => {
        setShowroomPlace(false)
        document.body.style.overflow = "auto";
        document.querySelector("#navbar").style.zIndex = '30'
    }

    return (
        <>
            <div className="h-max mb-[10px] sm:px-[35px] px-[15px]">
                {/* onClick={() => handleClicks()} */}
                <span onClick={() => handleClicks()} className={`underline text-[12px] cursor-pointer ${theme === "dark" ? 'text-white' : 'text-black'}`}>
                    *See Disclaimers
                </span>
            </div>
            {/* popup box */}
            {/* ex-showroom placement shows */}
            {
                showroomPlace &&
                <div className='w-full h-full fixed top-0 left-0 bottom-0 right-0 z-50'>
                    {/* overlays */}
                    <div onClick={() => handleClose()} className='z-50 w-full h-full fixed left-0 right-0 top-0 bottom-0 bg-[#0B0B0C] opacity-[0.9]'></div>
                    {/* select place menu content */}
                    <div className={`${isOpen ? 'opacity-1' : 'opacity-0'} transition-opacity w-full h-full flex items-center justify-center`}>
                        <div className={`z-[100] sm:w-[500px] w-[340px] h-[291px] ${theme === "dark" ? 'bg-[#212121]' : 'bg-white'} rounded-[20px] p-[20px] relative  overflow-hidden`}>
                            {/* title */}
                            <div className='w-full flex items-center justify-between mb-[10px]'>
                                <h2 className={`${theme === "dark" ? 'text-white' : 'text-black'} font-black`}>Disclaimer</h2>
                                {/* cancle button */}
                                <div onClick={() => handleClose()} className={`font-bold absolute top-[20px] right-[20px] cursor-pointer`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                        <path d="M1 1.5L15 15.5" stroke={`${theme === "dark" ? 'white' : '#0B0B0C'}`} strokeWidth="2" strokeLinecap="round" />
                                        <path d="M15 1.5L1 15.5" stroke={`${theme === "dark" ? 'white' : '#0B0B0C'}`} strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </div>

                            {/* contents */}
                            <div id="overFlowNone" className='w-full overflow-scroll h-[210px] pb-[15px]'>
                                <p className={`${theme === "dark" ? 'text-white' : 'text-black'}`}>
                                    *Prices at the time of delivery will prevail.
                                    The Booking amount depends on the model and variant of the Vehicle.
                                    The same may vary depending on the Customers choice of Vehicle. Acceptance of
                                    bookings/advance payment by M&M on <Link className='font-black' href="https://auto.mahindra.com">https://auto.mahindra.com</Link> Portal is merely an indication of an intention to sell and does not result in a contract of sale. The Customer/Applicant agrees that M&M shall not be deemed to have accepted the Application of the Applicant or be bound by the Application until M&M or its authorized Dealer notifies the Applicant in writing of its acceptance of the Application subject to the terms & conditions, contained on the <Link className='font-black' href='https://auto.mahindra.com/terms-of-use'>https://auto.mahindra.com/terms-of-use</Link> portal.
                                </p>

                                <div className='w-full mt-[10px]'>
                                    <p className={`${theme === "dark" ? 'text-white' : 'text-black'}`}>
                                        <span className='font-black'>Terms & Conditions :</span> Prices listed here (on-road price or ex-showroom price) do not constitute an offer and are only indicative prices which are subject to change. <span className='font-black'>Kindly note that proceeding would mean that</span> you hereby agree that the final prices and schemes offered by the dealership at the time of vehicle invoicing will be applicable to your purchase. EPC (Environmental Protection Charge) may be applicable at limited registration locations (Eg.Delhi and NCR and others). You may contact your selected dealership for more information.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default DisclaimerPopup