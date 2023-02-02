import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import AccessoriesBox from '../../../../../components/AccessoriesBox';
import Buttons from '../../../../../components/Buttons';
import Navbar from '../../../../../components/navbar/Navbar';
// import InputFields from '../../../../../components/InputFields';

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

        try {

            if (!getCardDetails) {
                router.push('/');
            } else {
                setCardDetails(JSON.parse(getCardDetails));
            }

        } catch (error) {
            console.log(error)
        }
    }, [router])

    // dealer set in localstorage

    const [getSelectedDealer, setGetSelectedDealer] = useState(0);

    useEffect(() => {
        const selectCarDealerId = cardDetails.dealerSelectedId;

        setGetSelectedDealer(selectCarDealerId)

    }, [cardDetails]);

    // Exterior
    const exteriorBox = [
        {
            id: 1,
            text: 'chrome fender garnish',
            text2: 'set mid & base (2pcs)',
            price: 3214,
            imgSrc: "/accessoriesImg.png",
            active: false
        },
        {
            id: 2,
            text: 'chrome fender garnish',
            text2: 'set mid & base (2pcs)',
            price: 3215,
            imgSrc: "/accessoriesImg.png",
            active: true
        },
        {
            id: 3,
            text: 'chrome fender garnish',
            text2: 'set mid & base (2pcs)',
            price: 3216,
            imgSrc: "/accessoriesImg.png",
            active: false
        },
        {
            id: 4,
            text: 'chrome fender garnish',
            text2: 'set mid & base (2pcs)',
            price: 3217,
            imgSrc: "/accessoriesImg.png",
            active: false
        }
    ]

    // Exterior
    const interiorBox = [
        {
            id: 1,
            text: 'chrome fender garnish',
            text2: 'set mid & base (2pcs)',
            price: 3214,
            imgSrc: "/accessoriesImg.png",
            active: false
        },
        {
            id: 2,
            text: 'chrome fender garnish',
            text2: 'set mid & base (2pcs)',
            price: 3215,
            imgSrc: "/accessoriesImg.png",
            active: true
        },
        {
            id: 3,
            text: 'chrome fender garnish',
            text2: 'set mid & base (2pcs)',
            price: 3216,
            imgSrc: "/accessoriesImg.png",
            active: true
        },
        {
            id: 4,
            text: 'chrome fender garnish',
            text2: 'set mid & base (2pcs)',
            price: 3217,
            imgSrc: "/accessoriesImg.png",
            active: false
        }
    ]

    const [idAdd, setIdAdd] = useState(0)

    const handleActiveClick = (id) => {
        setIdAdd(id)
    }

    return (
        <>
            <Head>
                <title>Cars Accessories</title>
                <meta name="description" content="Product List" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar theme={theme} />

            <div className='w-full h-full max-w-[1200px] mx-auto xl:px-0 px-[15px] mb-[90px]'>
                {/* titles and searches */}
                <div className='w-full flex sm:flex-row flex-col sm:gap-0 gap-[5px] sm:justify-between sm:items-center sm:my-[18px] mt-[18px]'>
                    {/* titles */}
                    <div className="w-full">
                        <h1 className={`${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'} text-[26px] font-bold`}>Accessories</h1>
                    </div>

                    {/* searchs boxs */}
                    <div className='w-max'>
                        <div className='w-[286px] h-[36px] relative'>
                            <input type="search" placeholder='Search for Accessories' className={`w-full p-[8px_16px] pr-[36px] rounded-[5px] placeholder:capitalize 1x1:placeholder:text-[14px] placeholder:text-[12px] ${theme === "dark" ? 'bg-[#242424] text-white placeholder:text-[#635D5D]' : 'bg-white text-black placeholder:text-[#635D5D]'}`} />

                            <div className='h-[16px] absolute right-[14px] top-[10px]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M15.7881 13.8289L12.6703 10.7135C12.5999 10.6434 12.5164 10.588 12.4245 10.5505C12.3326 10.513 12.2341 10.4941 12.1349 10.495H11.6253C12.6436 9.19083 13.1259 7.54761 12.9738 5.90034C12.8217 4.25308 12.0467 2.72583 10.8068 1.63001C9.56693 0.534185 7.95556 -0.0476787 6.30126 0.00305985C4.64696 0.0537984 3.07431 0.733318 1.904 1.90306C0.733679 3.0728 0.0538249 4.64468 0.00306136 6.29816C-0.0477022 7.95165 0.534448 9.56223 1.63081 10.8015C2.72717 12.0408 4.25517 12.8154 5.90324 12.9674C7.55132 13.1194 9.19535 12.6374 10.5001 11.6196V12.1289C10.4993 12.2281 10.5182 12.3265 10.5557 12.4184C10.5932 12.5103 10.6487 12.5938 10.7187 12.664L13.8357 15.7794C13.9051 15.8493 13.9877 15.9048 14.0786 15.9427C14.1696 15.9805 14.2672 16 14.3657 16C14.4642 16 14.5618 15.9805 14.6528 15.9427C14.7437 15.9048 14.8263 15.8493 14.8957 15.7794L15.7809 14.8947C15.9213 14.7535 16 14.5626 16 14.3635C16 14.1645 15.9213 13.9736 15.7809 13.8324L15.7881 13.8289ZM6.50247 10.495C5.71092 10.495 4.93716 10.2604 4.27901 9.82081C3.62087 9.38127 3.10791 8.75653 2.805 8.0256C2.50209 7.29467 2.42283 6.49037 2.57725 5.71442C2.73168 4.93847 3.11284 4.22571 3.67255 3.66628C4.23225 3.10685 4.94536 2.72588 5.72169 2.57153C6.49803 2.41718 7.30272 2.4964 8.03401 2.79916C8.7653 3.10192 9.39034 3.61463 9.8301 4.27245C10.2699 4.93027 10.5046 5.70366 10.5046 6.49481C10.5049 7.02022 10.4017 7.54054 10.2007 8.02602C9.99965 8.51149 9.70487 8.95261 9.33317 9.32412C8.96147 9.69564 8.52014 9.99028 8.03442 10.1912C7.54871 10.3921 7.02813 10.4953 6.50247 10.495Z" fill={`${theme === "dark" ? '#635D5D' : 'black'}`} />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* contents */}
                <div className='w-full h-full'>
                    {/* box 1 */}
                    <div className='mb-[20px]'>
                        {/* titles */}
                        <div className='w-full mt-[1rem] mb-[10px]'>
                            <h6 className={`${theme === "dark" ? 'text-white' : 'text-black'} text-[18px] font-bold`}>Exterior (1 Selected)</h6>
                        </div>
                        {/* grid Accessories boxs */}
                        <div className='w-full h-auto grid lg:grid-cols-4 grid-cols-2 gap-[15px]'>

                            {/* {Array.from({ length: exteriorBox.length }, (_, i) => <AccessoriesBox key={i} theme={theme} box={exteriorBox} />)} */}
                            {/* <AccessoriesBox id={1} setActiveBox={setActiveBox} handleActiveClick={handleActiveClick} theme={theme} text="chrome fender garnish" text2="set mid & base (2pcs)" price={3214} />
                            <AccessoriesBox id={2} setActiveBox={setActiveBox} handleActiveClick={handleActiveClick} theme={theme} text="chrome fender garnish" text2="set mid & base (2pcs)" price={3214} />
                            <AccessoriesBox id={3} setActiveBox={setActiveBox} handleActiveClick={handleActiveClick} theme={theme} text="chrome fender garnish" text2="set mid & base (2pcs)" price={3214} />
                            <AccessoriesBox id={4} setActiveBox={setActiveBox} handleActiveClick={handleActiveClick} theme={theme} text="chrome fender garnish" text2="set mid & base (2pcs)" price={3214} /> */}

                            {
                                exteriorBox.map((ele) => {
                                    const { id, text, text2, imgSrc, price } = ele;
                                    const prices = new Intl.NumberFormat('en-IN').format(price);

                                    return (
                                        <div key={id} className='w-full relative max-h-[260px] shadow-md rounded-[10px]'>
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
                                                    {/* icons */}
                                                    {
                                                        id === 2 &&
                                                        <div className='h-[19px]'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                                                <path d="M9 18.8655C13.9706 18.8655 18 14.836 18 9.86548C18 4.89492 13.9706 0.865479 9 0.865479C4.02944 0.865479 0 4.89492 0 9.86548C0 14.836 4.02944 18.8655 9 18.8655Z" fill="#FF3E5B" />
                                                                <path d="M7.06564 12.8656C6.89987 12.8655 6.74076 12.8003 6.62258 12.6841L4.55879 10.6203C4.49753 10.5628 4.44844 10.4936 4.41445 10.4168C4.38046 10.34 4.36226 10.2571 4.36092 10.1731C4.35958 10.0891 4.37514 10.0057 4.40667 9.92783C4.4382 9.84996 4.48505 9.77923 4.54446 9.71983C4.60386 9.66043 4.67459 9.61357 4.75246 9.58204C4.83032 9.55051 4.91373 9.53495 4.99772 9.53629C5.08172 9.53763 5.16459 9.55583 5.24141 9.58983C5.31823 9.62382 5.38744 9.6729 5.44492 9.73416L7.05564 11.3449L11.8786 6.58502C11.9365 6.52642 12.0055 6.47989 12.0816 6.44813C12.1576 6.41638 12.2392 6.40002 12.3216 6.40002C12.4041 6.40002 12.4857 6.41638 12.5617 6.44813C12.6378 6.47989 12.7068 6.52642 12.7647 6.58502C12.8808 6.70326 12.9459 6.86236 12.9459 7.02809C12.9459 7.19382 12.8808 7.35292 12.7647 7.47115L7.49871 12.6741C7.44346 12.7339 7.37652 12.7818 7.30204 12.8148C7.22755 12.8477 7.14709 12.865 7.06564 12.8656Z" fill="white" />
                                                            </svg>
                                                        </div>
                                                    }
                                                </div>

                                                {/* add buttons */}
                                                <div onClick={() => handleActiveClick(id)} className='absolute -top-[25%] right-3 h-[36px] w-[36px] rounded-full bg-white cursor-pointer flex items-center justify-center'>
                                                    {
                                                        id === 2 || idAdd === id ? (
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
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/* box 2 */}

                    <div className='mb-[20px]'>
                        {/* titles */}
                        <div className='w-full mt-[1rem] mb-[10px]'>
                            <h6 className={`${theme === "dark" ? 'text-white' : 'text-black'} text-[18px] font-bold`}>Interior (2 Selected)</h6>
                        </div>
                        {/* grid Accessories boxs */}
                        <div className='w-full h-auto grid lg:grid-cols-4 grid-cols-2 gap-[15px]'>
                            {/* <AccessoriesBox theme={theme} text="chrome fender garnish" text2="set mid & base (2pcs)" price={3214} />
                            <AccessoriesBox theme={theme} text="chrome fender garnish" text2="set mid & base (2pcs)" price={3214} />
                            <AccessoriesBox theme={theme} text="chrome fender garnish" text2="set mid & base (2pcs)" price={3214} />
                            <AccessoriesBox theme={theme} text="chrome fender garnish" text2="set mid & base (2pcs)" price={3214} /> */}
                            {
                                interiorBox.map((ele) => {
                                    const { id, text, text2, imgSrc, price, active } = ele;
                                    const prices = new Intl.NumberFormat('en-IN').format(price);

                                    return (
                                        <div key={id} className='w-full relative max-h-[260px] shadow-md rounded-[10px]'>
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
                                                    {/* icons */}
                                                    {
                                                        active === true &&
                                                        <div className='h-[19px]'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                                                <path d="M9 18.8655C13.9706 18.8655 18 14.836 18 9.86548C18 4.89492 13.9706 0.865479 9 0.865479C4.02944 0.865479 0 4.89492 0 9.86548C0 14.836 4.02944 18.8655 9 18.8655Z" fill="#FF3E5B" />
                                                                <path d="M7.06564 12.8656C6.89987 12.8655 6.74076 12.8003 6.62258 12.6841L4.55879 10.6203C4.49753 10.5628 4.44844 10.4936 4.41445 10.4168C4.38046 10.34 4.36226 10.2571 4.36092 10.1731C4.35958 10.0891 4.37514 10.0057 4.40667 9.92783C4.4382 9.84996 4.48505 9.77923 4.54446 9.71983C4.60386 9.66043 4.67459 9.61357 4.75246 9.58204C4.83032 9.55051 4.91373 9.53495 4.99772 9.53629C5.08172 9.53763 5.16459 9.55583 5.24141 9.58983C5.31823 9.62382 5.38744 9.6729 5.44492 9.73416L7.05564 11.3449L11.8786 6.58502C11.9365 6.52642 12.0055 6.47989 12.0816 6.44813C12.1576 6.41638 12.2392 6.40002 12.3216 6.40002C12.4041 6.40002 12.4857 6.41638 12.5617 6.44813C12.6378 6.47989 12.7068 6.52642 12.7647 6.58502C12.8808 6.70326 12.9459 6.86236 12.9459 7.02809C12.9459 7.19382 12.8808 7.35292 12.7647 7.47115L7.49871 12.6741C7.44346 12.7339 7.37652 12.7818 7.30204 12.8148C7.22755 12.8477 7.14709 12.865 7.06564 12.8656Z" fill="white" />
                                                            </svg>
                                                        </div>
                                                    }
                                                </div>

                                                {/* add buttons */}
                                                <div onClick={() => handleActiveClick(id)} className='absolute -top-[25%] right-3 h-[36px] w-[36px] rounded-full bg-white cursor-pointer flex items-center justify-center'>
                                                    {
                                                        active === true ? (
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
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className="mb-[10px] mt-[20px]">
                    {/* <DisclaimerPopup theme={theme} /> */}
                    <p className={`${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'} text-[12px]`}>
                        <b>Disclaimer:</b> The information presented on this Website is made available solely for general information purposes. <span className='underline font-bold'>Read More</span>
                    </p>
                </div>
            </div>

            {/* footer */}
            {/* see disclaimers */}
            <div className="fixed bottom-0 left-0 right-0 h-max w-full mt-0 z-10">
                {/* <div className="z-50 max-w-[1200px] mx-auto xl:px-0 px-[15px] mb-[10px] lg:block hidden">
                    <p className={`${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'} text-[12px]`}>
                        <b>Disclaimer:</b> The information presented on this Website is made available solely for general information purposes. <span className='underline font-bold'>Read More</span>
                    </p>
                </div> */}
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