import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import AddonsExclusive from '../../../components/AddonsExclusive';
import Buttons from '../../../components/Buttons';
import CustomiseQuote from '../../../components/CustomiseQuote';
import Navbar from '../../../components/navbar/Navbar';
import Steppers from '../../../components/Steppers';

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
    }, [theme])

    // get cars data from localstorage

    // car details
    const [cardDetails, setCardDetails] = useState([]);
    // user data details
    // const [userDetails, setUserDetails] = useState([]);

    const router = useRouter();

    useEffect(() => {
        const getCardDetails = localStorage.getItem('cardsDetails');
        const getUserData = localStorage.getItem('userDetails');

        if (!getCardDetails && !getUserData) {
            router.push('/');
        } else {
            setCardDetails(JSON.parse(getCardDetails));
            // setUserDetails(JSON.parse(getUserData));
        }

    }, [router])

    // subTitles
    const [subTitleText, setSubTitleText] = useState([]);

    useEffect(() => {
        setSubTitleText(cardDetails.subTitle)
    }, [cardDetails])


    // cars images
    const carImages = cardDetails ? cardDetails.imgSrc : null;

    const themeChangeColor = theme === "dark" ? 'text-white' : 'text-black';

    // contents box
    const [showContents, setShowContents] = useState(false);

    // Customise Your Quote icons
    const financeIcons =
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="25" viewBox="0 0 28 25" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.5603 3.89312L10.074 2.04518L7.15615 3.89312H10.5603ZM11.5702 1.05093L12.159 3.28825L16.88 0.298266C17.6086 -0.163215 18.5757 0.216835 18.7952 1.05093L19.5431 3.89312H21.2254C22.8684 3.89312 24.2004 5.22507 24.2004 6.86812V10.6931H25.9004C26.8393 10.6931 27.6004 11.4542 27.6004 12.3931V15.7931C27.6004 16.732 26.8393 17.4931 25.9004 17.4931H24.2004V21.3181C24.2004 22.9612 22.8684 24.2931 21.2254 24.2931H3.37539C1.73234 24.2931 0.400391 22.9612 0.400391 21.3181V6.86812C0.400391 5.22507 1.73234 3.89312 3.37539 3.89312H3.97889L9.65497 0.298266C10.3836 -0.163215 11.3507 0.216835 11.5702 1.05093ZM17.299 2.04518L17.7853 3.89312H14.3812L17.299 2.04518ZM22.5004 6.86812V10.6931H20.8004C18.9226 10.6931 17.4004 12.2153 17.4004 14.0931C17.4004 15.9709 18.9226 17.4931 20.8004 17.4931H22.5004V21.3181C22.5004 22.0223 21.9296 22.5931 21.2254 22.5931H3.37539C2.67123 22.5931 2.10039 22.0223 2.10039 21.3181V6.86812C2.10039 6.16395 2.67123 5.59312 3.37539 5.59312H21.2254C21.9296 5.59312 22.5004 6.16395 22.5004 6.86812ZM25.9004 12.3931H20.8004C19.8615 12.3931 19.1004 13.1542 19.1004 14.0931C19.1004 15.032 19.8615 15.7931 20.8004 15.7931H25.9004V12.3931ZM20.8004 14.9431C21.2698 14.9431 21.6504 14.5626 21.6504 14.0931C21.6504 13.6237 21.2698 13.2431 20.8004 13.2431C20.3309 13.2431 19.9504 13.6237 19.9504 14.0931C19.9504 14.5626 20.3309 14.9431 20.8004 14.9431Z" fill={`${theme === "dark" ? 'white' : 'black'}`} />
        </svg>;

    const accessoriesIcons =
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="29" viewBox="0 0 20 29" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M13.1017 1.79595L13.381 3.28376L6.61992 3.28376L6.89925 1.79595L13.1017 1.79595ZM15.1463 3.47349C15.2937 4.25823 14.6917 4.98376 13.8932 4.98376H12.8365V6.01046H13.121C14.8415 6.01046 16.2908 7.29569 16.4966 9.00384L17.5617 17.8464C17.6339 18.4455 17.5453 19.0531 17.305 19.6066L16.8152 20.7354C16.7946 20.7828 16.7727 20.8293 16.7495 20.875H18.3802C19.2628 20.875 19.9235 21.634 19.7466 22.4448L18.648 27.4794C18.5152 28.088 17.9441 28.525 17.2816 28.525H3.14419C2.48166 28.525 1.91057 28.088 1.77778 27.4794L0.679187 22.4448C0.502271 21.634 1.16296 20.875 2.0456 20.875H3.25139C3.22822 20.8293 3.20631 20.7828 3.18574 20.7354L2.69586 19.6066C2.45561 19.0531 2.36702 18.4455 2.43919 17.8464L3.50434 9.00384C3.7101 7.29569 5.15944 6.01046 6.87994 6.01046H7.16439V4.98376H6.1077C5.30925 4.98376 4.70726 4.25823 4.85459 3.47349L5.29351 1.13568C5.40671 0.532777 5.93318 0.0959473 6.54662 0.0959473H13.4543C14.0677 0.0959473 14.5942 0.532779 14.7074 1.13568L15.1463 3.47349ZM8.86439 4.98376V6.01046H9.57548H10.0004H11.1365V4.98376H8.86439ZM6.87994 7.71046C6.01969 7.71046 5.29502 8.35308 5.19214 9.20715L4.12699 18.0497C4.0909 18.3493 4.1352 18.653 4.25532 18.9298L4.7452 20.0586C4.88001 20.3692 5.18633 20.5702 5.52493 20.5702H9.57548H10.0004H14.476C14.8146 20.5702 15.1209 20.3692 15.2557 20.0586L15.7456 18.9298C15.8657 18.653 15.91 18.3493 15.8739 18.0497L14.8088 9.20715C14.7059 8.35308 13.9812 7.71046 13.121 7.71046H10.0004H9.57548H6.87994ZM2.61525 22.6186L3.52361 26.7814H16.9022L17.8105 22.6186H2.61525ZM7.51698 10.9183C7.04754 10.9183 6.66698 11.2989 6.66698 11.7683C6.66698 12.2377 7.04754 12.6183 7.51698 12.6183H10.0004L10.0013 12.6183H12.4838C12.9532 12.6183 13.3338 12.2377 13.3338 11.7683C13.3338 11.2989 12.9532 10.9183 12.4838 10.9183H10.0004H10.0003H7.51698ZM6.60037 15.1254C6.13093 15.1254 5.75037 15.506 5.75037 15.9754C5.75037 16.4449 6.13093 16.8254 6.60037 16.8254H9.99939H10.0003H13.4004C13.8698 16.8254 14.2504 16.4449 14.2504 15.9754C14.2504 15.506 13.8698 15.1254 13.4004 15.1254H10.0004H10.0003H6.60037Z" fill={`${theme === "dark" ? 'white' : 'black'}`} />
        </svg>

    const filesIcons =
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="27" viewBox="0 0 22 28" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.4998 2.10039V25.9004H19.4998V8.90039H14.1873C13.6005 8.90039 13.1248 8.42469 13.1248 7.83789V2.10039H2.4998ZM14.8248 3.15893L18.8721 7.20039H14.8248V3.15893ZM0.799805 1.46289C0.799805 0.876087 1.2755 0.400391 1.8623 0.400391H14.0285C14.3101 0.400391 14.5801 0.512123 14.7793 0.711052L20.8881 6.81107C21.0877 7.01037 21.1998 7.28085 21.1998 7.56291V26.5379C21.1998 27.1247 20.7241 27.6004 20.1373 27.6004H1.8623C1.2755 27.6004 0.799805 27.1247 0.799805 26.5379V1.46289ZM5.0498 12.3004C4.58036 12.3004 4.1998 12.6809 4.1998 13.1504C4.1998 13.6198 4.58036 14.0004 5.0498 14.0004H16.9498C17.4192 14.0004 17.7998 13.6198 17.7998 13.1504C17.7998 12.6809 17.4192 12.3004 16.9498 12.3004H5.0498ZM4.1998 17.4004C4.1998 16.9309 4.58036 16.5504 5.0498 16.5504H16.9498C17.4192 16.5504 17.7998 16.9309 17.7998 17.4004C17.7998 17.8698 17.4192 18.2504 16.9498 18.2504H5.0498C4.58036 18.2504 4.1998 17.8698 4.1998 17.4004ZM5.0498 20.8004C4.58036 20.8004 4.1998 21.1809 4.1998 21.6504C4.1998 22.1198 4.58036 22.5004 5.0498 22.5004H16.9498C17.4192 22.5004 17.7998 22.1198 17.7998 21.6504C17.7998 21.1809 17.4192 20.8004 16.9498 20.8004H5.0498Z" fill={`${theme === "dark" ? 'white' : '#0B0B0C'}`} />
        </svg>


    // dealer set in localstorage
    const [getSelectedDealer, setGetSelectedDealer] = useState([]);

    // user details
    const [getUserDetails, setGetUserDetails] = useState([]);

    useEffect(() => {
        // cars dealer name
        const selectCarDealerName = localStorage.getItem('dealerName');

        // userNames
        const userDetails = localStorage.getItem('userDetails');

        if (!selectCarDealerName) {
            setGetSelectedDealer([])
        }

        if (!userDetails) {
            setGetUserDetails([])
        }

        // cars dealer name
        setGetSelectedDealer([JSON.parse(selectCarDealerName)]);
        // userNames
        setGetUserDetails(JSON.parse(userDetails))

    }, [cardDetails]);

    useEffect(() => {
        try {
            getUserDetails && localStorage.setItem("userDetailsExistings", JSON.stringify(getUserDetails))
        } catch (error) {
            console.log(error)
        }
    });

    const [successfull, setSuccessfull] = useState(false)

    const handleSubmits = () => {
        setSuccessfull(true);
    }

    const lightSuccessfullImg = '/Congratulations.gif';
    const darkSuccessfullImg = '/Congratulations.gif';

    return (
        <>
            <Head>
                <title>Mahindra Booking</title>
                <meta name="description" content="Product List" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar theme={theme} />

            <div className='w-full h-full md:pt-[10px] max-w-[1200px] mx-auto xl:px-0 px-[15px]'>
                {/* steppers */}
                {
                    successfull === true ? (
                        <div className='w-full h-max flex gap-[8px] items-center'>
                            {/* images */}
                            <div className='md:h-[52px] h-[50px] w-[54px] overflow-hidden'>

                                <Image height={52} width={54} className={`w-full h-full object-contain ${theme === "dark" ? '' : ''}`} src={theme === "dark" ? darkSuccessfullImg : lightSuccessfullImg} alt="successfull-buying" />

                            </div>
                            {/* user names */}
                            <div className='w-max'>
                                {
                                    getUserDetails.map((ele) => {

                                        const userName = ele.userName.split(' ', 1);

                                        return (
                                            <h1 key={ele.id} className={`${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'} md:text-[26px] xss:text-[22px] text-[20px] font-bold capitalize`}>
                                                Hi {ele.userName === "" ? 'Ashish' : userName}. Congratulations!
                                            </h1>
                                        )
                                    })
                                }

                                {/* cars name */}
                                <p className={`${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'} text-[14px] font-bold`}>Your {cardDetails.title} is booked</p>
                            </div>
                        </div>
                    ) : (
                        <div className='w-full h-[30px] flex justify-center'>
                            <Steppers theme={theme} Steps={3} />
                        </div>
                    )
                }
                {/* main cars details */}

                <div className={`w-full h-full ${successfull === true ? 'xss:mt-[15px] mt-[10px]' : 'md:mt-[45px] mt-[30px]'}`}>
                    {/* cars dealer selections */}
                    <div className='w-full h-full flex xl:flex-row flex-col xl:gap-[20px] gap-[10px] mb-[70px]'>
                        {/* left sides */}
                        <div className='xl:w-1/2 w-full h-full xl:sticky xl:top-[72px]'>
                            {/* cars title */}
                            <div className="w-full pb-[10px]">
                                {/* title */}
                                <h2 className={`${theme === "dark" ? 'text-white' : 'text-black'} md:text-[24px] text-[20px] font-[800] uppercase`}>{cardDetails.title}</h2>
                                {/* subtitle */}
                                <ul className='flex items-center justify-start flex-wrap sm:gap-x-[8px] gap-x-[6px]'>

                                    {
                                        subTitleText?.map((ele) => {
                                            const { id, text } = ele
                                            {/* break-words */ }
                                            return (
                                                <li key={id} style={{ listStyleType: `${id === 1 && 'none'}` }} className={`${id === 1 ? '' : ''} ${theme === "dark" ? 'text-white' : 'text-black'} w-max flex items-center sm:gap-[8px] gap-[6px] uppercase font-bold md:text-[18px] text-[16px]`}>
                                                    <span className={`w-[6px] h-[6px] ${theme === "dark" ? 'bg-white' : 'bg-black'} rounded-full`}></span>
                                                    {text}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>

                                {/* dealers names */}

                                <div className='w-full 1x1:mt-[16px] mt-[10px] md:w-[80%]'>
                                    <h6 className={`${themeChangeColor} sm:text-[14px] text-[12px]`}>Dealer</h6>
                                    <h6 className={`${themeChangeColor} font-bold sm:text-[14px] text-[12px]`}>
                                        {
                                            getSelectedDealer?.map((ele) => {
                                                const { shopName, id, shopPinCode } = ele;

                                                const pinCode = shopPinCode.split(',', 2);
                                                return shopName + " " + pinCode[1]
                                            })
                                        }
                                    </h6>
                                </div>

                                {/* orders status */}
                                {
                                    successfull === true ?
                                        (
                                            <p className={`${theme === "dark" ? 'text-white' : 'text-black'} mt-[14px] text-[14px]`}>
                                                Order Status:
                                                <span className='text-[#44DD30] font-bold'> In progress</span>
                                            </p>
                                        )
                                        : ''
                                }
                            </div>
                            {/* cars images */}
                            <div className="1x1:w-[460px] xl:w-[380px] sm:w-[400px] w-[280px] mx-auto 1x1:h-[343px] sm:h-[280px] h-[187px] md:mt-0 mt-[5px]">
                                {
                                    carImages &&
                                    <Image width={280} height={280} src={carImages && carImages} alt="product-img" className='w-full h-full object-contain' />
                                }
                            </div>

                            <div className='1x1:fixed 1x1:bottom-[80px] 1x1:w-[35%] xl:block hidden'>
                                <div className={`flex gap-[6px] ${themeChangeColor}`}>
                                    <p className='text-[12px] font-bold'>Disclaimer:</p>
                                    <span className='text-[12px]'>
                                        *Cancellation charges to the tune of 10% of the Booking amount will be applicable on each and every cancellation (except Scorpio-N bookings). The Waiting Period For Your Selected Variant Is 4-6 Weeks <span className='underline'>Read More</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* right sides */}
                        <div id="overFlowNone" className='xl:w-1/2 w-full h-full mb-[20px] md:max-h-[530px] overflow-scroll'>
                            <div className='w-full'>
                                {/* booking title */}
                                <div className='w-full h-full mb-[20px]'>
                                    <div className='w-full flex items-end justify-between leading-[15px]'>
                                        {/* title */}
                                        <h3 className={`${themeChangeColor} sm:text-[20px] text-[18px] font-bold`}>Booking Summary</h3>
                                        {/* Download Quote */}
                                        <div className='flex items-center gap-[10px]'>
                                            {/* icons */}
                                            <div className='h-[20px]'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                    <path d="M10.7337 14.8095C10.565 14.8095 10.4032 14.7425 10.2839 14.6233C10.1647 14.504 10.0977 14.3422 10.0977 14.1735V1.03053C10.0977 0.861854 10.1647 0.700084 10.2839 0.580811C10.4032 0.461538 10.565 0.394531 10.7337 0.394531C10.9023 0.394531 11.0641 0.461538 11.1834 0.580811C11.3026 0.700084 11.3697 0.861854 11.3697 1.03053V14.1735C11.3697 14.3422 11.3026 14.504 11.1834 14.6233C11.0641 14.7425 10.9023 14.8095 10.7337 14.8095Z" fill={`${theme === "dark" ? 'white' : '#0B0B0C'}`} />
                                                    <path d="M10.7383 14.8089C10.6548 14.8092 10.5721 14.7929 10.495 14.7607C10.4179 14.7286 10.3479 14.6814 10.2893 14.6219L6.89733 11.2309C6.83824 11.1718 6.79136 11.1017 6.75938 11.0245C6.7274 10.9473 6.71094 10.8645 6.71094 10.7809C6.71094 10.6974 6.7274 10.6146 6.75938 10.5374C6.79136 10.4602 6.83824 10.39 6.89733 10.3309C7.01668 10.2116 7.17855 10.1445 7.34733 10.1445C7.43091 10.1445 7.51366 10.161 7.59087 10.193C7.66808 10.225 7.73824 10.2718 7.79733 10.3309L10.7403 13.2729L13.6833 10.3309C13.7424 10.2718 13.8126 10.225 13.8898 10.193C13.967 10.161 14.0498 10.1445 14.1333 10.1445C14.2169 10.1445 14.2997 10.161 14.3769 10.193C14.4541 10.225 14.5242 10.2718 14.5833 10.3309C14.6424 10.39 14.6893 10.4602 14.7213 10.5374C14.7533 10.6146 14.7697 10.6974 14.7697 10.7809C14.7697 10.8645 14.7533 10.9473 14.7213 11.0245C14.6893 11.1017 14.6424 11.1718 14.5833 11.2309L11.1903 14.6219C11.131 14.6813 11.0605 14.7283 10.9829 14.7604C10.9054 14.7925 10.8223 14.809 10.7383 14.8089Z" fill={`${theme === "dark" ? 'white' : '#0B0B0C'}`} />
                                                    <path d="M18.5815 20.7449H2.8945C2.27618 20.7444 1.68333 20.4985 1.24611 20.0613C0.808892 19.6241 0.56303 19.0313 0.5625 18.4129V14.5969C0.5625 14.4283 0.629507 14.2665 0.74878 14.1472C0.868053 14.0279 1.02982 13.9609 1.1985 13.9609C1.36718 13.9609 1.52895 14.0279 1.64822 14.1472C1.76749 14.2665 1.8345 14.4283 1.8345 14.5969V18.4129C1.83503 18.6939 1.94688 18.9632 2.14555 19.1619C2.34422 19.3606 2.61353 19.4724 2.8945 19.4729H18.5815C18.8624 19.4724 19.1316 19.3605 19.3301 19.1618C19.5286 18.9631 19.6402 18.6938 19.6405 18.4129V14.5969C19.6405 14.5134 19.6569 14.4307 19.6889 14.3536C19.7209 14.2764 19.7677 14.2063 19.8268 14.1472C19.8858 14.0882 19.9559 14.0413 20.0331 14.0093C20.1103 13.9774 20.193 13.9609 20.2765 13.9609C20.36 13.9609 20.4427 13.9774 20.5199 14.0093C20.597 14.0413 20.6672 14.0882 20.7262 14.1472C20.7853 14.2063 20.8321 14.2764 20.8641 14.3536C20.896 14.4307 20.9125 14.5134 20.9125 14.5969V18.4129C20.912 19.0311 20.6662 19.6238 20.2292 20.061C19.7922 20.4982 19.1996 20.7441 18.5815 20.7449Z" fill={`${theme === "dark" ? 'white' : '#0B0B0C'}`} />
                                                </svg>
                                            </div>

                                            {/* download text */}
                                            <span className={`${themeChangeColor} text-[12px] font-[500]`}>Download Quote</span>
                                        </div>
                                    </div>
                                    {/* content box */}
                                    <div className={`w-full h-full mt-[18px] ${theme === "dark" ? 'bg-[#242424]' : 'bg-white'} shadow-md ${showContents === true && `divide-y-[1px] divide-[#8E8585]`} p-[20px] rounded-[10px]`}>
                                        {/* ${showContents === true && `border-t-[1px] ${theme === "dark" ? 'border-white' : 'border-black'}`} */}
                                        <div onClick={() => setShowContents(!showContents)} className={`select-none cursor-pointer w-full h-full flex items-center justify-between ${showContents === true ? ' pb-[14px]' : 'pb-0'}`}>
                                            {/* text */}
                                            <div className='flex items-center gap-[20px]'>
                                                {/* files icons */}
                                                <div className='h-[26px]'>
                                                    {filesIcons && filesIcons}
                                                </div>
                                                {/* prices */}
                                                <div className='flex items-center gap-2'>
                                                    <h2 className={`${themeChangeColor} md:text-[18px] text-[16px] font-bold select-none`}>
                                                        ₹{new Intl.NumberFormat('en-IN').format(cardDetails.price)}*
                                                    </h2>
                                                    <span className={`${themeChangeColor} text-[12px]`}>Ex-Showroom Mumbai</span>
                                                </div>

                                            </div>
                                            {/* icons */}
                                            <div className='h-[20px] flex items-center'>
                                                <svg width="20" className={`${showContents === false && 'rotate-180'}`} height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M19.0588 11.2377C19.3005 11.0111 19.3128 10.6314 19.0862 10.3897L10.0862 0.789657C9.97273 0.668667 9.81428 0.600022 9.64844 0.600022C9.48259 0.600022 9.32414 0.668667 9.21071 0.789657L0.210714 10.3897C-0.0159245 10.6314 -0.00367548 11.0111 0.238071 11.2377C0.47982 11.4644 0.859522 11.4521 1.08616 11.2104L9.64844 2.07729L18.2107 11.2104C18.4374 11.4521 18.8171 11.4644 19.0588 11.2377Z" fill={`${theme === "dark" ? 'white' : 'black'}`} />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* contents */}

                                        {
                                            showContents &&
                                            <div className={`w-full h-max pt-[12px] rounded-[0_0_10px_10px] ${theme === "dark" ? 'text-white' : 'text-black'} divide-y divide-[#635D5D]`}>
                                                {/* Additional Details */}
                                                <div className='w-full h-full'>
                                                    {/* title */}
                                                    <div className='mb-[12px]'>
                                                        <h2 className='text-[16px] font-bold'>Additional Details</h2>
                                                    </div>

                                                    {/* Booking Ref. No. */}
                                                    <div className='mb-[12px]'>
                                                        <h6 className='text-[14px]'>Booking Ref. No.</h6>
                                                        <h2 className='text-[14px] font-bold mt-[2px]'>X31A2BF3F1B7</h2>
                                                    </div>

                                                    {/* dealer */}
                                                    <div className='mb-[12px]'>
                                                        <h6 className='text-[14px]'>Dealer Name</h6>
                                                        <h2 className='text-[14px] font-bold mt-[2px]'>
                                                            {
                                                                getSelectedDealer?.map((ele) => {
                                                                    const { shopName, id, shopPinCode } = ele;

                                                                    const pinCode = shopPinCode.split(',', 2);

                                                                    return (
                                                                        <>
                                                                            <p key={shopName} className={`${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'}`}>{shopName}</p>
                                                                            <p key={id} className={`${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'}`}>Pin Code - {pinCode[1]}</p>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </h2>
                                                    </div>

                                                    {/* city */}
                                                    <div className='mb-[12px]'>
                                                        <h6 className='text-[14px]'>City of  Registeration</h6>
                                                        <h2 className='text-[14px] font-bold mt-[2px]'>Pune</h2>
                                                    </div>
                                                </div>

                                                {/* personal details */}
                                                <div className='w-full h-full pt-[12px]'>
                                                    {/* title */}
                                                    <div className='mb-[12px]'>
                                                        <h2 className='text-[16px] font-bold'>Personal Details</h2>
                                                    </div>

                                                    <div className='flex items-start md:flex-row flex-col justify-between'>
                                                        {/* dealer */}
                                                        <div className='md:w-1/2 mb-[12px]'>
                                                            <h6 className='text-[14px]'>Full Name</h6>
                                                            {
                                                                getUserDetails.map((ele) => {

                                                                    return (
                                                                        <h2 key={ele.id} className={`text-[14px] font-bold mt-[2px] capitalize ${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'}`}>
                                                                            {ele.userName ? ele.userName : 'your name'}
                                                                        </h2>
                                                                    )
                                                                })
                                                            }
                                                        </div>

                                                        {/* city */}
                                                        <div className='md:w-1/2 mb-[12px]'>
                                                            <h6 className='text-[14px]'>City/State</h6>
                                                            <h2 className='text-[14px] font-bold mt-[2px]'>Mumbai, Maharashtra</h2>
                                                        </div>
                                                    </div>

                                                    <div className='flex items-start md:flex-row flex-col justify-between'>
                                                        {/* dealer */}
                                                        <div className='md:w-1/2 mb-[12px]'>
                                                            <h6 className='text-[14px]'>Mobile no.</h6>
                                                            {
                                                                getUserDetails.map((ele) => {

                                                                    return (
                                                                        <h2 key={ele.id} className={`text-[14px] font-bold mt-[2px] capitalize ${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'}`}>
                                                                            +91 {ele.userNumber ? ele.userNumber : '9145******'}
                                                                        </h2>
                                                                    )
                                                                })
                                                            }
                                                        </div>

                                                        {/* city */}
                                                        <div className='md:w-1/2 mb-[12px]'>
                                                            <h6 className='text-[14px]'>Email</h6>
                                                            {
                                                                getUserDetails.map((ele) => {

                                                                    return (
                                                                        <h2 key={ele.id} className={`text-[14px] font-bold mt-[2px] ${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'}`}>
                                                                            {ele.userEmail ? ele.userEmail : 'email@example.com'}
                                                                        </h2>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>

                                                    {/* disclaimer */}

                                                    <div className='w-full'>
                                                        <p className='sm:text-[12px] text-[10px]'>Disclaimer: All prices shown here are indicative. Dealership will validate and share the final on road price.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>

                                {/* Customise Your Quote */}
                                <div className='w-full h-full'>
                                    <div className='w-full mb-[14px]'>
                                        {/* title */}
                                        <h3 className={`${themeChangeColor} sm:text-[20px] text-[18px] font-bold`}>Customise Your Quote</h3>
                                    </div>

                                    {/* boxes */}
                                    <div className='w-full h-full flex flex-col gap-[16px]'>
                                        {/* box 1 */}
                                        <CustomiseQuote link='' theme={theme} icons={financeIcons && financeIcons} getSelectedDealer={getSelectedDealer} cardDetails={cardDetails} text="Finance Your Vehicle" />
                                        <CustomiseQuote link='' theme={theme} icons={filesIcons && filesIcons} text="Get Insurance Quote" />
                                        <CustomiseQuote link='/own-online/finance/application/details/accessories' getSelectedDealer={getSelectedDealer} cardDetails={cardDetails} theme={theme} icons={accessoriesIcons && accessoriesIcons} text="Accessories" />
                                    </div>

                                    {/* add-ons and exclusive benefits */}
                                    <AddonsExclusive theme={theme} policies={cardDetails.addOns} />
                                </div>
                            </div>

                            <div className='xl:hidden block mt-[30px]'>
                                <div className={`flex gap-[6px] ${themeChangeColor}`}>
                                    <p className='sm:text-[12px] text-[10px] font-bold'>Disclaimer:</p>
                                    <span className='sm:text-[12px] text-[10px]'>
                                        *Cancellation charges to the tune of 10% of the Booking amount will be applicable on each and every cancellation (except Scorpio-N bookings). The Waiting Period For Your Selected Variant Is 4-6 Weeks <span className='underline'>Read More</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* footer */}
            {/* see disclaimers */}
            <div className="fixed bottom-0 left-0 right-0 h-max w-full mt-0 z-10">
                <div className="z-50">
                    {/* <DisclaimerPopup theme={theme} /> */}
                </div>
                {/* main footer */}
                <div className={`w-full h-[70px] ${theme === "dark" ? 'bg-[#242424]' : 'bg-white'} px-[35px] flex items-center justify-center`}>
                    <div className="h-[44px] flex items-center justify-center gap-8">
                        {
                            successfull === true ? ('') : (
                                <Buttons theme={theme} userDetails={getUserDetails} cardsItems={cardDetails} links="/own-online/dealer" title="back" outline={true} />
                            )
                        }

                        {/* end buttons */}
                        {/* disabled={successfull === true ? true : null} */}
                        {/* ${successfull === true ? 'opacity-[0.6]' : 'opacity-1'} */}
                        <button onClick={() => handleSubmits()} type="button" className={`sm:text-[16px] text-[15px] relative z-[5] capitalize xl:w-[157px] w-[150px] h-full before:content-[""] before:absolute before:left-0 before:right-0 before:bottom-0 before:top-0 before:w-[157px] before:h-[44px] before:border-[1px] hover:text-white text-white before:bg-[#ff3e5b] before:border-[#ff3e5b] before:z-[-1] after:content-[""] after:absolute after:xl:right-[-10px] after:right-[-15px] after:bottom-0 after:top-0 after:bg-[#ff3e5b] after:w-[2px] after:h-full font-bold
                        `}
                        >
                            {successfull === true ? 'Go to My Bookings' : ' Pay ₹21 000.00'}
                            <style jsx>
                                {`
                                button::after,
                                button:before {
                                    transform:skew(-13deg);
                                }
                            `}
                            </style>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index