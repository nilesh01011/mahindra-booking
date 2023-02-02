import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Buttons from '../../../../../components/Buttons';
import InputFields from '../../../../../components/AddOnsInputsFields'
import SelectBox from '../../../../../components/SelectBox';
import Navbar from '../../../../../components/navbar/Navbar';
import Head from 'next/head';

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

    const text = 'Cash benefits up to <max value>* Applied';

    const BoxText = "*Avail corporate benefits up to <max value>";

    const Box2Text = "*Avail benefits up to <max value> when you trade-in your old vehicle";

    const selectMakeItems = [
        {
            id: 1,
            name: 'items'
        },
        {
            id: 2,
            name: 'items 1'
        },
        {
            id: 3,
            name: 'items 2'
        },
        {
            id: 4,
            name: 'items 3'
        }
    ]

    const selectModelItems = [
        {
            id: 1,
            name: 'items model'
        },
        {
            id: 2,
            name: 'items model 1'
        },
        {
            id: 3,
            name: 'items model 2'
        },
        {
            id: 4,
            name: 'items model 3'
        }
    ]

    // Mandatory fields

    const [empName, setEmpName] = useState(false);

    const [compName, setCompName] = useState(false);

    const [empId, setEmpId] = useState(false);

    const [empEmail, setEmpEmail] = useState(false);

    const handleCorBenfs = (e) => {
        e.preventDefault()

        // if(!empName || !compName || !empId || !empEmail) {

        // }
    }

    return (
        <>
            <Head>
                <title>Exclusive-Benefits Accessories</title>
                <meta name="description" content="Product List" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar theme={theme} />

            {/* contents */}
            <div className='w-full h-full max-w-[1200px] mx-auto xl:px-0 px-[15px]'>
                {/* titles */}
                <div className="w-full sm:my-[18px] mt-[18px] mb-[10px]">
                    <h1 className={`${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'} text-[26px] font-bold`}>Exclusive Benefits</h1>

                    <p className={`${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'} md:text-[18px] text-[16px] mt-[1rem]`}>
                        *All exclusive benefits indicated here are subject to validation and approval at the dealership. Submission of request for exclusive benefit is not a guarantee that the same will be applicable at the time of retail.
                    </p>
                </div>

                {/* contents */}

                <div className='w-full h-full mb-[90px]'>
                    {/* *Mandatory fields */}
                    <div className='w-full mb-[12px]'>
                        <span className={`${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'} 1x1:text-[14px] text-[12px] relative before:content-["*"] before:absolute before:-left-[7px] before:-top-[2px] before:text-[#FF3E5B] before:text-[16px]`}>Mandatory fields</span>
                    </div>

                    {/* cash benefits */}

                    <div className={`w-full md:h-[144px] h-max p-[20px] rounded-[10px] shadow-md divide-y-[1px] ${theme === "dark" ? 'bg-[#242424] divide-[#8E8585]' : 'bg-white divide-[#DEDEDE]'}`}>
                        {/* titles */}
                        <div className='w-full pb-[16px]'>
                            <h6 className={`${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'} capitalize text-[18px]`}>Cash Benefits</h6>
                        </div>

                        {/* texts */}
                        <div className='w-full pt-[16px]'>
                            <h6 className={`${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'} capitalize flex items-center`}>
                                {text}
                                <span className='h-[18px] ml-[3px]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <path d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z" fill="#FF3E5B" />
                                        <path d="M7.06564 12.0007C6.89987 12.0007 6.74076 11.9355 6.62258 11.8192L4.55879 9.75542C4.49753 9.69794 4.44844 9.62874 4.41445 9.55192C4.38046 9.47509 4.36226 9.39222 4.36092 9.30823C4.35958 9.22423 4.37514 9.14082 4.40667 9.06296C4.4382 8.9851 4.48505 8.91436 4.54446 8.85496C4.60386 8.79556 4.67459 8.7487 4.75246 8.71717C4.83032 8.68564 4.91373 8.67009 4.99772 8.67142C5.08172 8.67276 5.16459 8.69097 5.24141 8.72496C5.31823 8.75895 5.38744 8.80803 5.44492 8.8693L7.05564 10.48L11.8786 5.72016C11.9365 5.66155 12.0055 5.61502 12.0816 5.58326C12.1576 5.55151 12.2392 5.53516 12.3216 5.53516C12.4041 5.53516 12.4857 5.55151 12.5617 5.58326C12.6378 5.61502 12.7068 5.66155 12.7647 5.72016C12.8808 5.83839 12.9459 5.99749 12.9459 6.16322C12.9459 6.32895 12.8808 6.48805 12.7647 6.60628L7.49871 11.8092C7.44346 11.8691 7.37652 11.9169 7.30204 11.9499C7.22755 11.9828 7.14709 12.0001 7.06564 12.0007Z" fill="white" />
                                    </svg>
                                </span>
                            </h6>
                            <h6 className={`${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'} capitalize`}>
                                Actual value and applicability to be confirmed at the dealership.
                            </h6>
                        </div>
                    </div>

                    {/* content boxs */}
                    <div className='mt-[24px] flex flex-col gap-[20px]'>

                        {/* Corporate Benefits */}
                        <div className={`w-full md:h-[312px] h-max divide-y-[1px] ${theme === "dark" ? 'bg-[#242424] divide-[#8E8585]' : 'bg-white divide-[#DEDEDE]'} shadow-md rounded-[10px] p-[20px]`}>
                            <div className='w-full pb-[16px]'>
                                <span className={`${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'} text-[18px] font-bold capitalize`}>
                                    Corporate Benefits
                                </span>
                            </div>

                            {/* text contents */}
                            <form onSubmit={(e) => handleCorBenfs(e)} className='pt-[16px]'>
                                {/* text */}
                                <div className='mb-[16px]'>
                                    <span className={`${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'}`}>
                                        {BoxText}
                                    </span>
                                </div>

                                {/* inputs fileds */}
                                <div className='w-full grid md:grid-cols-3 grid-cols-1 items-center gap-[20px]'>
                                    {/* emp full name */}
                                    <InputFields validity={empName} theme={theme} inputType="text" placeholder="Employee Full Name" mandatory="*" />
                                    {/* search inputs */}
                                    <div className='w-full relative'>
                                        <InputFields validity={compName} theme={theme} inputType="search" placeholder="select company" mandatory="*" />
                                        <div className='h-[19px] absolute right-[16px] top-[14px]'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.43469 0.399902C3.9972 0.399902 0.399902 3.9972 0.399902 8.43469C0.399902 12.8722 3.9972 16.4695 8.43469 16.4695C10.4375 16.4695 12.2691 15.7367 13.6761 14.5246L18.5756 19.4242C18.8099 19.6585 19.1898 19.6585 19.4242 19.4242C19.6585 19.1898 19.6585 18.8099 19.4242 18.5756L14.5246 13.6761C15.7367 12.2691 16.4695 10.4375 16.4695 8.43469C16.4695 3.9972 12.8722 0.399902 8.43469 0.399902ZM1.5999 8.43469C1.5999 4.65994 4.65994 1.5999 8.43469 1.5999C12.2094 1.5999 15.2695 4.65994 15.2695 8.43469C15.2695 12.2094 12.2094 15.2695 8.43469 15.2695C4.65994 15.2695 1.5999 12.2094 1.5999 8.43469Z" fill={`${theme === "dark" ? 'white' : 'black'}`} />
                                            </svg>
                                        </div>
                                    </div>
                                    {/* emp id */}
                                    <InputFields validity={empId} theme={theme} inputType="text" maxLength={6} placeholder="Employee Id" mandatory="*" />
                                    {/* emp email */}
                                    <InputFields validity={empEmail} theme={theme} inputType="email" placeholder="Employee email" mandatory="*" />
                                </div>

                                <div className='w-full h-[44px] flex items-center md:justify-end justify-center md:mt-0 mt-[20px]'>
                                    <Buttons type="submit" theme={theme} title="request" outline={true} />
                                </div>
                            </form>
                        </div>

                        {/* Exchange Benefits */}
                        <div className={`w-full md:h-[312px] h-max divide-y-[1px] ${theme === "dark" ? 'bg-[#242424] divide-[#8E8585]' : 'bg-white divide-[#DEDEDE]'} shadow-md rounded-[10px] p-[20px]`}>
                            <div className='w-full pb-[16px]'>
                                <span className={`${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'} text-[18px] font-bold capitalize`}>
                                    Exchange Benefits
                                </span>
                            </div>

                            {/* text contents */}
                            <div className='pt-[16px]'>
                                {/* text */}
                                <div className='mb-[16px]'>
                                    <span className={`${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'}`}>
                                        {Box2Text}
                                    </span>
                                </div>

                                {/* inputs fileds */}
                                <div className='w-full grid md:grid-cols-3 grid-cols-1 items-center gap-[20px]'>
                                    {/* emp full name */}
                                    <SelectBox theme={theme} items={selectMakeItems} placeholder="select make" mandatory="*" />

                                    <SelectBox theme={theme} items={selectModelItems} placeholder="select model" mandatory="*" />

                                    {/* vehicle register no. */}
                                    <InputFields theme={theme} inputType="text" maxLength={10} placeholder="vehicle Registration number" />
                                    {/* emp email */}
                                    <InputFields theme={theme} inputType="email" placeholder="Employee email" mandatory="*" />
                                </div>

                                <div className='w-full h-[44px] flex items-center md:justify-end justify-center md:mt-0 mt-[20px]'>
                                    <Buttons type="submit" theme={theme} title="request" outline={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* footer */}
            {/* see disclaimers */}
            <div className="fixed bottom-0 left-0 right-0 h-max w-full mt-0 z-30">
                <div className="z-50">
                    {/* <DisclaimerPopup theme={theme} /> */}
                </div>
                {/* main footer */}
                <div className={`w-full h-[70px] ${theme === "dark" ? 'bg-[#242424]' : 'bg-white'} px-[35px] flex items-center justify-center shadow-md`}>
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