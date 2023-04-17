import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { TabsContents } from '../../../../../api/TabsContents';
import Buttons from '../../../../../components/Buttons';
import Navbar from '../../../../../components/navbar/Navbar';

function Index() {
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
        document.body.style.backgroundColor = `${theme === "light" ? '#F4F4F4' : '#0B0B0C'}`
    }, [theme]);

    // get cars data from localstorage

    const [cardDetails, setCardDetails] = useState([]);

    const router = useRouter();

    useEffect(() => {
        const getCardDetails = localStorage.getItem('cardsDetails');

        if (!getCardDetails) {
            router.push('/')
        } else {
            setCardDetails(JSON.parse(getCardDetails))
        }
    }, [router])

    // dealer set in localstorage

    const [getSelectedDealer, setGetSelectedDealer] = useState(0);

    useEffect(() => {
        const selectCarDealerId = cardDetails.dealerSelectedId;

        setGetSelectedDealer(selectCarDealerId)

    }, [cardDetails]);

    const [showRecommedPolicies, setShowRecommedPolicies] = useState(1);

    const handleIdContent = (id) => {
        setShowRecommedPolicies(id)
    }

    const [recommedPolicesSelect, setRecommedPolicesSelect] = useState(1);

    const handleRecommedPolicesSelect = (id) => {
        setRecommedPolicesSelect(id)
    }

    return (
        <>
            <Head>
                <title>Add-ons</title>
                <meta name="description" content="Mahindra Booking Add-ons" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar theme={theme} />

            <div className="w-full h-full max-w-[1200px] mx-auto xl:px-0 px-[15px]">
                {/* titles */}
                <div className="w-full sm:my-[18px] mt-[18px] mb-[10px]">
                    <h1 className={`${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'} text-[26px] font-bold`}>Add-Ons</h1>
                </div>

                {/* tabs contents */}

                <div className="w-full h-full">
                    {/* nav tabs */}
                    {/* xs:pl-0 pl-[87%] */}
                    <nav id='overFlowXAxies' className={`w-full flex sm:justify-center justify-start items-center h-[35px] overflow-scroll`} >
                        {
                            TabsContents.map((ele) => {
                                const { id, title } = ele

                                return (
                                    <button type='button' onClick={() => handleIdContent(id)} key={title} className={`h-[26px] whitespace-nowrap relative w-max text-[18px] px-[34px] pb-[6px] ${showRecommedPolicies === id ? `font-bold` : ``} ${theme === "dark" ? 'text-white' : 'text-black'} capitalize`}>
                                        {title}
                                        <span className={`absolute -bottom-[1px] left-0 w-full h-[2px] ${showRecommedPolicies === id ? 'bg-[#FF3E5B] opacity-1' : 'bg-[#FF3E5B] opacity-[20%]'}`}></span>
                                    </button>
                                )
                            })
                        }
                    </nav>

                    {/* showContents */}

                    {
                        TabsContents.map((ele) => {
                            const { id, topBox, recommedPolicies } = ele;

                            if (showRecommedPolicies === id) {
                                return (
                                    <div key={id} className="w-full h-full mt-[22px]">
                                        {/* topBox */}
                                        <div className={`h-max flex items-center gap-[10px] w-full rounded-[10px] shadow-md ${theme === "dark" ? 'bg-[#242424]' : 'bg-white'} p-[18px_20px]`}>
                                            {/* icons */}
                                            <div className='h-[20px]'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                    <path d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z" fill="#FF3E5B" />
                                                    <path d="M7.06515 12.0001C6.89938 12 6.74027 11.9349 6.62209 11.8186L4.5583 9.75481C4.49704 9.69733 4.44796 9.62813 4.41396 9.5513C4.37997 9.47448 4.36177 9.39161 4.36043 9.30762C4.35909 9.22362 4.37465 9.14021 4.40618 9.06235C4.43771 8.98448 4.48457 8.91375 4.54397 8.85435C4.60337 8.79495 4.6741 8.74809 4.75197 8.71656C4.82983 8.68503 4.91324 8.66948 4.99724 8.67081C5.08123 8.67215 5.1641 8.69036 5.24092 8.72435C5.31774 8.75834 5.38695 8.80742 5.44443 8.86869L7.05515 10.4794L11.8781 5.71954C11.936 5.66094 12.005 5.61441 12.0811 5.58265C12.1571 5.5509 12.2387 5.53455 12.3212 5.53455C12.4036 5.53455 12.4852 5.5509 12.5612 5.58265C12.6373 5.61441 12.7063 5.66094 12.7642 5.71954C12.8803 5.83778 12.9454 5.99688 12.9454 6.16261C12.9454 6.32834 12.8803 6.48744 12.7642 6.60567L7.49822 11.8086C7.44297 11.8685 7.37604 11.9163 7.30155 11.9493C7.22706 11.9822 7.1466 11.9995 7.06515 12.0001Z" fill="white" />
                                                </svg>
                                            </div>

                                            {/* text */}
                                            <h4 className={`${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'} text-[18px]`}>{topBox}</h4>
                                        </div>

                                        {/* recommedPolicies */}

                                        <div className='w-full h-full mt-[24px]'>
                                            {/* titles */}
                                            <div className='flex items-center justify-between'>
                                                <h2 className={`${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'} text-[20px] font-bold`}>Recommended  Policies</h2>

                                                {/* clear buttons */}
                                                <button onClick={() => setRecommedPolicesSelect(0)} type='button' className={`relative capitalize text-[14px] ${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'}`}>
                                                    Clear Selection
                                                    <span className={`absolute left-0 bottom-0 w-full h-[1px] ${theme === "dark" ? 'bg-white' : 'bg-[#242424]'}`}></span>
                                                </button>
                                            </div>

                                            {/* selects policies */}

                                            <div className='w-full md:h-[50px] flex items-center md:flex-row flex-col gap-[20px] mt-[10px]'>
                                                {
                                                    recommedPolicies.map((el) => {
                                                        const { id, year, prices } = el;

                                                        return (
                                                            <div key={id} onClick={() => handleRecommedPolicesSelect(id)} className={`cursor-pointer flex items-center justify-between w-full h-full p-[12px_20px] rounded-[10px] shadow-md ${theme === "dark" ? 'bg-[#242424]' : 'bg-white'}`}>
                                                                {/* years */}
                                                                <span className={`font-bold ${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'}`}>{year}</span>
                                                                {/* prices and select icons */}
                                                                <div className='flex items-center gap-[16px]'>
                                                                    {/* prices */}
                                                                    <span className={`font-bold ${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'}`}>₹{new Intl.NumberFormat('en-IN').format(prices)}*</span>

                                                                    {/* select icons */}
                                                                    <div className='h-full'>
                                                                        <div className={`relative w-[16px] h-[16px] flex items-center justify-center border-[2px] ${recommedPolicesSelect === id ? 'border-[#FF3E5B]' : 'border-[#8E8585]'} rounded-full`}>
                                                                            {
                                                                                recommedPolicesSelect === id &&
                                                                                <span className={`bg-[#FF3E5B] w-[8px] h-[8px] rounded-full`}></span>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                        })
                    }
                </div>

                {/* footer */}
                {/* see disclaimers */}
                <div className="mt-[20px] mb-[90px] w-full h-full md:hidden block">
                    {/* <DisclaimerPopup theme={theme} /> */}
                    <p className={`${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'} text-[12px]`}>
                        <b>Disclaimer:</b> The information presented on this Website is made available solely for general information purposes. <span className='underline font-bold'>Read More</span>
                    </p>
                </div>
            </div>

            {/* footer */}
            {/* see disclaimers */}
            <div className="fixed bottom-0 left-0 right-0 h-max w-full mt-0 z-10">
                <div className="z-50 max-w-[1200px] mx-auto xl:px-0 px-[15px] mb-[10px] md:block hidden">
                    {/* <DisclaimerPopup theme={theme} /> */}
                    <p className={`${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'} text-[12px]`}>
                        <b>Disclaimer:</b> The information presented on this Website is made available solely for general information purposes. <span className='underline font-bold'>Read More</span>
                    </p>
                </div>
                {/* main footer */}
                <div className={`w-full h-[70px] ${theme === "dark" ? 'bg-[#242424]' : 'bg-white'} px-[35px] flex items-center justify-center`}>
                    <div className="h-[44px] flex items-center justify-center gap-8">
                        <Buttons theme={theme} links="/own-online/finance/summary" title="back" outline={true} cardsItems={cardDetails} dealersId={getSelectedDealer} />
                        {/* disabled={buttonDisabled === true ? buttonDisabled : null} */}
                        <Buttons theme={theme} links="/own-online/finance/summary" title="continue" outline={false} cardsItems={cardDetails} dealersId={getSelectedDealer} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index