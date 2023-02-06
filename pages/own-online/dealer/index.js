import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import Buttons from '../../components/Buttons';
import SelectStateCity from '../../components/SelectStateCity';
import Steppers from '../../components/Steppers';
import InputFields from "../../components/InputFields"
import Navbar from '../../components/navbar/Navbar';
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

    // get carDetails

    const [cardDetails, setCardDetails] = useState([])

    const router = useRouter();

    useEffect(() => {
        const getCardDetails = localStorage.getItem('cardsDetails');

        if (!getCardDetails) {
            router.push('/own-online/model-selection')
        } else {
            setCardDetails(JSON.parse(getCardDetails))
        }
    }, [router])

    // subTitles

    const [subTitleText, setSubTitleText] = useState([])

    useEffect(() => {
        setSubTitleText(cardDetails.subTitle)
    }, [cardDetails])

    useEffect(() => {
        document.body.style.backgroundColor = `${theme === "light" ? '#F4F4F4' : '#0B0B0C'}`
    }, [theme])

    // cars dealer

    const [carDealer, setCarDealer] = useState([]);

    const [buttonDisabled, setButtonDisabled] = useState(true);

    // get selected Dealer from localstorage

    const [selectCarDealer, setSelectCarDealer] = useState(0);

    // push dealer name to localstorages
    useEffect(() => {

        if (cardDetails) {

            const setDealerId = carDealer?.map((ele) => {

                if (ele.id === selectCarDealer) {
                    localStorage.setItem("dealerName", JSON.stringify(ele))
                }
            })
        }

    }, [cardDetails, selectCarDealer, carDealer]);

    // user existings get from localStorages

    const [getUserDetails, setGetUserDetails] = useState([])

    useEffect(() => {
        const getUserData = localStorage.getItem("userDetailsExistings");

        // if (getUserData === undefined) {
        //     // setGetUserDetails(getUserData);
        //     setGetUserDetails([])
        // } else {
        //     // setGetUserDetails(JSON.parse(getUserData));
        //     console.log(getUserData)
        // }

        try {
            setGetUserDetails(JSON.parse(getUserData));

        } catch (error) {
            console.log(error);
            setGetUserDetails([])
        }

    }, [])

    useEffect(() => {
        setCarDealer(cardDetails.dealer);

    }, [cardDetails.dealer]);

    const handleDealerClicks = (ele) => {
        setSelectCarDealer(ele.id);
        setButtonDisabled(false)
    }

    const [inputValue, setInputValue] = useState('');

    // const [noDealer, setNoDealer] = useState(false)

    const inputPincode = (e) => {
        setInputValue(e);

        const valueMatch = cardDetails.dealer.filter((ele) => {

            if (ele.shopPinCode.match(e)) {
                return ele
            }
        })

        if (!valueMatch) {
            setCarDealer(cardDetails.dealer)
            // setNoDealer(true)
        } else {
            setCarDealer(valueMatch);
            // setNoDealer(false)
        }
    }

    const carImages = cardDetails ? cardDetails.imgSrc : null;

    // handleValidity functions

    const [openValidity, setOpenValidity] = useState(false);
    // number input checks
    const [validity, setValidity] = useState(false);

    const [getInputValues, setGetInputValues] = useState('')
    // verify number
    const [verified, setVerified] = useState(true);
    // verify OTP
    const [verifiedOtp, setVerifiedOtp] = useState(false);
    // user existings checks
    const [userCheck, setUserCheck] = useState(false);
    // box opens
    const [openExistUser, setOpenExistUser] = useState(false);
    // user number match with numbers he enters
    const [checkUserNumberExist, setCheckUserNumberExist] = useState('');

    useEffect(() => {

        // if (getUserDetails !== undefined && getUserDetails !== null) {
        //     const getUserData = getUserDetails && getUserDetails?.map((ele) => {

        //         if (getInputValues === ele.userNumber) {
        //             return setCheckUserNumberExist(ele.userNumber);
        //         }
        //     })

        // } else {
        //     setCheckUserNumberExist('')
        // }

        try {
            const getUserData = getUserDetails && getUserDetails?.map((ele) => {

                if (getInputValues === ele.userNumber) {
                    return setCheckUserNumberExist(ele.userNumber);
                }
            })
        } catch (error) {
            setCheckUserNumberExist('')
        }

    }, [getInputValues, getUserDetails]);

    // handleValidity box show
    const handleValidity = () => {
        setOpenValidity(true);
        document.body.style.overflow = "hidden";
        document.querySelector("#navbar").style.zIndex = '-1'
    }

    // close handleValidity box
    const handleClose = () => {
        setOpenValidity(false)
        document.body.style.overflow = "auto";
        document.querySelector("#navbar").style.zIndex = '30'
    }

    const [otp, setOtp] = useState(new Array(4).fill(""));

    const [timer, setTimer] = useState(false)
    const [timesCount, setTimesCount] = useState(45);

    // timer useEffects

    useEffect(() => {
        const handleTimers = () => {
            if (timer === true) {
                timesCount > 0 && setTimeout(() => setTimesCount(timesCount - 1), 1000);
            }

            if (timesCount === 0) {
                setTimer(false);
                setTimesCount(45);
            }
        }

        return handleTimers();

    }, [timer, timesCount]);

    const handleOPTValidity = (e) => {
        e.preventDefault();
        setTimer(true);
        setVerified(false);
        setVerifiedOtp(true);
        const inputs = document.querySelector('#otpChecks').value;


        // setGetInputValues("+91" + inputs);
        setGetInputValues(inputs);

        // if (inputs === "") {
        //     setValidity(true);
        // }
    }

    // OTP input values
    const handleOTPChange = (element, index) => {

        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index) ? element : d)]);

        if (element.nextSibling) {
            element.nextSibling.focus()
        }
    }

    // verify completed
    const handleVerifyOTP = (e) => {
        e.preventDefault();

        console.log(checkUserNumberExist === getInputValues)

        if (checkUserNumberExist === getInputValues) {
            // existing user data sets
            // alert("matchs with to :", checkUserNumberExist, "this", getInputValues)

            setVerified(false);
            setVerifiedOtp(false);
            setUserCheck(false);

            setOpenExistUser(true);
        } else {
            // alert(false);
            // new user data sets
            setVerified(false);
            setVerifiedOtp(false);
            setOpenExistUser(false);

            setUserCheck(true);
        }
    }

    const [checked, setChecked] = useState(false);
    const [checked_2, setChecked_2] = useState(false);

    // emails and name checks
    const [userName, setUserName] = useState(false);

    const [userEmail, setUserEmail] = useState(false);

    const [checkValidity, setCheckValidity] = useState(false);

    // user data store to the localStorages
    const [userData, setUserData] = useState([]);

    const handleSubmits = (e) => {
        e.preventDefault();

        const inputsName = document.querySelector('#nameChecks').value;

        const inputsEmail = document.querySelector('#emailChecks').value;

        // if (inputsName === "") {
        //     setUserName(true);
        // }


        // if (inputsEmail === "") {
        //     setUserEmail(true)
        // }

        if (checked === true) {
            // set locations to summary pages

            if (inputsName && inputsEmail && getInputValues) {
                setUserData([{
                    id: 1,
                    userName: inputsName,
                    userEmail: inputsEmail,
                    userNumber: getInputValues
                }]);

                router.push('/own-online/finance/summary');
                handleClose()

            } else {

                // testing purpose when it's deploy remove it this line 
                setUserData([{
                    id: 1,
                    userName: inputsName,
                    userEmail: inputsEmail,
                    userNumber: getInputValues
                }]);

                router.push('/own-online/finance/summary');
                handleClose()

                // end line code
            }

        } else {
            setCheckValidity(true);
            // if (!inputsName && !inputsEmail && !validity) {
            //     return undefined
            // }
        }
    }

    useEffect(() => {
        // if (!userData) {
        //     return undefined
        // }

        return localStorage.setItem("userDetails", JSON.stringify(userData));

    }, [getInputValues, userData, validity]);

    // ===== user existings =====

    const [getExistUserName, setGetExistUserName] = useState('');

    const [getExistUserEmail, setGetExistUserEmail] = useState('');

    useEffect(() => {
        // if (getUserDetails !== undefined && getUserDetails !== null) {
        //     const getUserData = getUserDetails?.map((ele) => {
        //         setGetExistUserName(ele.userName);
        //         setGetExistUserEmail(ele.userEmail)
        //     })
        // } else {
        //     setGetExistUserName('');
        //     setGetExistUserEmail('');
        // }

        try {
            const getUserData = getUserDetails?.map((ele) => {
                setGetExistUserName(ele.userName);
                setGetExistUserEmail(ele.userEmail)
            })
        } catch (error) {
            setGetExistUserName('');
            setGetExistUserEmail('');
        }
    }, [getUserDetails])

    const handleExistUserForm = (e) => {
        e.preventDefault();

        const inputsName = document.querySelector('#nameChecks').value;

        const inputsEmail = document.querySelector('#emailChecks').value;

        // if (inputsName === "") {
        //     setUserName(true);
        // }


        // if (inputsEmail === "") {
        //     setUserEmail(true)
        // }

        if (checked === true) {
            // set locations to summary pages

            if (inputsName && inputsEmail && getInputValues) {
                setUserData([{
                    id: 1,
                    userName: inputsName,
                    userEmail: inputsEmail,
                    userNumber: getInputValues
                }]);

                router.push('/own-online/finance/summary');
                handleClose()

            } else {

                // testing purpose when it's deploy remove it this line 
                setUserData([{
                    id: 1,
                    userName: inputsName,
                    userEmail: inputsEmail,
                    userNumber: getInputValues
                }]);

                router.push('/own-online/finance/summary');
                handleClose()

                // end line code
            }

        } else {
            setCheckValidity(true);
            // if (!inputsName && !inputsEmail && !validity) {
            //     return undefined
            // }
        }
    }

    return (
        <>
            <Head>
                <title>Cars Dealer List</title>
                <meta name="description" content="Product List" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar theme={theme} />

            <div className='w-full h-full md:pt-[10px] max-w-[1200px] mx-auto xl:px-0 px-[15px] dark:text-white'>
                {/* steppers */}
                <div className='w-full h-[30px] flex justify-center'>
                    <Steppers theme={theme} Steps={2} />
                </div>
                {/* main cars details */}

                <div className='w-full h-full'>
                    {/* select state and city */}
                    <div className='md:mt-[40px] mt-[28px] md:mb-[10px] mb-[7px]'>
                        <SelectStateCity theme={theme} />
                    </div>
                    {/* cars dealer selections */}
                    <div className='w-full h-full flex lg:flex-row flex-col lg:gap-[20px] gap-[10px] mb-[70px]'>
                        {/* left sides */}
                        <div className='lg:w-1/2 w-full h-full'>
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
                            </div>
                            {/* cars images */}
                            <div className="sm:w-[460px] w-[280px] mx-auto lg:h-[343px] sm:h-[280px] h-[154px] md:mt-0 mt-[5px]">
                                {
                                    carImages &&
                                    <Image width={425} height={343} src={carImages} alt="product-img" className='w-full h-full object-contain' />
                                }
                            </div>

                            <div className='1x1:fixed 1x1:bottom-[80px] 1x1:w-[35%] lg:block hidden'>
                                <div className='flex gap-[6px]'>
                                    <p className={`sm:text-[12px] text-[10px] font-bold ${theme === "dark" ? 'text-white' : 'text-black'}`}>Disclaimer:</p>
                                    <span className={`sm:text-[12px] text-[10px] ${theme === "dark" ? 'text-white' : 'text-black'}`}>
                                        The information presented on this website, including all pricing, loan & offer details
                                        are made available solely for general information purposes. <span className='underline'>Read More</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* right sides */}
                        <div className='lg:w-1/2 w-full h-full mb-[20px]'>
                            <div className='w-full'>
                                <div className='w-full flex items-end justify-between px-[3px] mb-[16px]'>
                                    {/* title */}
                                    <div className='h-[36px] flex items-end'>
                                        <h2 className={`${theme === "dark" ? 'text-white' : 'text-black'} md:text-[20px] text-[16px] font-bold`}>Select Dealer</h2>
                                    </div>
                                    {/* search by pincodes */}
                                    <div className={`w-auto max-h-[36px] relative`}>
                                        <input onChange={(e) => inputPincode(e.target.value)} value={inputValue} type="text" maxLength={6} className={`${theme === "dark" ? 'text-white bg-[#242424]' : 'text-black bg-white'} text-[14px] w-full h-full rounded-[5px] shadow-md outline-none border-none p-[10px_11px] pr-[30px] placeholder:text-[#635D5D] placeholder:text-[12px]`} placeholder='Search By Pin Code' />

                                        {/* icons */}
                                        <div className='absolute top-[9px] right-[9px]'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M15.7881 13.8289L12.6703 10.7135C12.5999 10.6434 12.5164 10.588 12.4245 10.5505C12.3326 10.513 12.2341 10.4941 12.1349 10.495H11.6253C12.6436 9.19083 13.1259 7.54761 12.9738 5.90034C12.8217 4.25308 12.0467 2.72583 10.8068 1.63001C9.56693 0.534185 7.95556 -0.0476787 6.30126 0.00305985C4.64696 0.0537984 3.07431 0.733318 1.904 1.90306C0.733679 3.0728 0.0538249 4.64468 0.00306136 6.29816C-0.0477022 7.95165 0.534448 9.56223 1.63081 10.8015C2.72717 12.0408 4.25517 12.8154 5.90324 12.9674C7.55132 13.1194 9.19535 12.6374 10.5001 11.6196V12.1289C10.4993 12.2281 10.5182 12.3265 10.5557 12.4184C10.5932 12.5103 10.6487 12.5938 10.7187 12.664L13.8357 15.7794C13.9051 15.8493 13.9877 15.9048 14.0786 15.9427C14.1696 15.9805 14.2672 16 14.3657 16C14.4642 16 14.5618 15.9805 14.6528 15.9427C14.7437 15.9048 14.8263 15.8493 14.8957 15.7794L15.7809 14.8947C15.9213 14.7535 16 14.5626 16 14.3635C16 14.1645 15.9213 13.9736 15.7809 13.8324L15.7881 13.8289ZM6.50247 10.495C5.71092 10.495 4.93716 10.2604 4.27901 9.82081C3.62087 9.38127 3.10791 8.75653 2.805 8.0256C2.50209 7.29467 2.42283 6.49037 2.57725 5.71442C2.73168 4.93847 3.11284 4.22571 3.67255 3.66628C4.23225 3.10685 4.94536 2.72588 5.72169 2.57153C6.49803 2.41718 7.30272 2.4964 8.03401 2.79916C8.7653 3.10192 9.39034 3.61463 9.8301 4.27245C10.2699 4.93027 10.5046 5.70366 10.5046 6.49481C10.5049 7.02022 10.4017 7.54054 10.2007 8.02602C9.99965 8.51149 9.70487 8.95261 9.33317 9.32412C8.96147 9.69564 8.52014 9.99028 8.03442 10.1912C7.54871 10.3921 7.02813 10.4953 6.50247 10.495Z" fill={`${theme === "dark" ? '#635D5D' : '#8E8585'}`} />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* pincode by search results */}
                                <div id='overFlowNone' className='mt-[10px] w-full max-h-[462px] overflow-scroll'>
                                    <div className='flex gap-[20px] flex-col w-full p-[5px]'>
                                        {
                                            carDealer?.slice(0, 5).map((ele) => {
                                                const { id, shopName, shopAddress, shopPinCode } = ele;

                                                return (
                                                    <div key={id} onClick={() => handleDealerClicks(ele)} className={`w-full h-max rounded-[10px] shadow-md ${theme === "dark" ? 'bg-[#242424]' : 'bg-white'} p-[16px] cursor-pointer`}>
                                                        <div className='w-full flex items-baseline gap-[16px] relative'>
                                                            {/* left side icons */}
                                                            <div className="w-auto flex items-center absolute top-[5px] left-0">
                                                                {
                                                                    selectCarDealer === id ? (
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                                            <path d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z" fill="#FF3E5B" />
                                                                            <path d="M6.59252 12.97C6.377 12.9698 6.17015 12.8851 6.01652 12.734L3.33352 10.051C3.25387 9.97623 3.19006 9.88626 3.14587 9.78639C3.10168 9.68652 3.07801 9.57878 3.07628 9.46959C3.07454 9.36039 3.09476 9.25196 3.13575 9.15073C3.17674 9.0495 3.23766 8.95755 3.31488 8.88032C3.3921 8.8031 3.48406 8.74218 3.58529 8.70119C3.68651 8.66021 3.79495 8.63998 3.90414 8.64172C4.01334 8.64346 4.12108 8.66712 4.22095 8.71131C4.32082 8.7555 4.41079 8.81932 4.48552 8.89896L6.57952 10.993L12.8495 4.80496C12.9248 4.72877 13.0145 4.66828 13.1134 4.62699C13.2123 4.58571 13.3184 4.56445 13.4255 4.56445C13.5327 4.56445 13.6387 4.58571 13.7376 4.62699C13.8365 4.66828 13.9262 4.72877 14.0015 4.80496C14.1525 4.95867 14.2371 5.16551 14.2371 5.38096C14.2371 5.59641 14.1525 5.80325 14.0015 5.95696L7.15552 12.721C7.0837 12.7988 6.99667 12.861 6.89984 12.9038C6.803 12.9467 6.6984 12.9692 6.59252 12.97Z" fill="white" />
                                                                        </svg>
                                                                    ) : (
                                                                        <div className={`w-[18px] h-[18px] rounded-full border-[1px] ${theme === "dark" ? 'border-white' : 'border-black'}`}></div>
                                                                    )
                                                                }
                                                            </div>

                                                            {/* middel contents */}

                                                            <div className='w-full px-[30px]'>
                                                                {/* title */}
                                                                <div className='w-[80%] h-full'>
                                                                    <h2 className={`${theme === "dark" ? 'text-white' : 'text-black'} xl:text-[18px] text-[16px] font-bold`}>
                                                                        {shopName}
                                                                    </h2>
                                                                    <p className={`${theme === "dark" ? 'text-white' : 'text-black'} text-[14px] font-bold`}>
                                                                        {shopPinCode}
                                                                    </p>
                                                                    <p className={`${theme === "dark" ? 'text-white' : 'text-black'} text-[14px]`}>
                                                                        {shopAddress}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            {/* right side locations */}
                                                            <div className="w-auto flex items-center absolute top-0 right-0">
                                                                {
                                                                    selectCarDealer === id ? (
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="none">
                                                                            <path d="M6.06402 15.28C5.99197 15.2815 5.9207 15.2649 5.85681 15.2317C5.79291 15.1984 5.73844 15.1497 5.69844 15.0899L2.31348 10.4774C1.28973 9.32358 0.679327 7.8634 0.578125 6.32617C0.578723 4.87181 1.15844 3.47718 2.18986 2.44879C3.22129 1.4204 4.62003 0.842393 6.07869 0.841797H6.10013C7.55404 0.850991 8.94545 1.43247 9.97143 2.45964C10.9974 3.48682 11.5749 4.87651 11.5781 6.32617C11.4816 7.86574 10.8715 9.32893 9.84502 10.483C9.64757 10.753 6.43637 15.0955 6.43637 15.0955C6.39152 15.1515 6.33497 15.197 6.27065 15.2288C6.20634 15.2607 6.13582 15.2782 6.06402 15.28ZM6.04935 1.75305C4.83536 1.75662 3.67232 2.24004 2.81527 3.09732C1.95822 3.95459 1.47709 5.11574 1.4774 6.32617C1.58869 7.66905 2.1366 8.93899 3.03786 9.94305L6.05838 14.0482C6.90688 12.9029 8.93221 10.1545 9.09356 9.94305C9.99401 8.93869 10.5411 7.66878 10.6518 6.32617C10.6509 5.11591 10.1692 3.95528 9.31219 3.09823C8.45515 2.24118 7.29251 1.75751 6.07869 1.75305H6.04935Z" fill="#FF3E5B" />
                                                                            <path d="M6.02588 8.69531C5.46798 8.69531 4.92261 8.53036 4.45873 8.22132C3.99485 7.91228 3.6333 7.47303 3.4198 6.95911C3.2063 6.44519 3.15044 5.87969 3.25928 5.33412C3.36812 4.78855 3.63678 4.28741 4.03127 3.89408C4.42577 3.50074 4.92839 3.23288 5.47557 3.12436C6.02275 3.01583 6.58992 3.07153 7.10535 3.2844C7.62079 3.49727 8.06134 3.85776 8.37129 4.32027C8.68125 4.78279 8.84668 5.32655 8.84668 5.88281C8.84668 6.62874 8.54949 7.34411 8.02049 7.87155C7.49149 8.399 6.774 8.69531 6.02588 8.69531ZM6.02588 3.97706C5.6481 3.97617 5.27855 4.08705 4.964 4.29567C4.64946 4.50429 4.40406 4.80126 4.25887 5.149C4.11368 5.49674 4.07523 5.87961 4.14838 6.24915C4.22154 6.61869 4.40301 6.95828 4.66982 7.22494C4.93663 7.4916 5.2768 7.67334 5.64725 7.74715C6.01771 7.82097 6.4018 7.78353 6.75091 7.6396C7.10002 7.49566 7.39845 7.25168 7.60843 6.93856C7.8184 6.62543 7.93049 6.25723 7.93049 5.88056C7.93019 5.37659 7.72957 4.89328 7.37259 4.5365C7.0156 4.17972 6.53134 3.97855 6.02588 3.97706Z" fill="#FF3E5B" />
                                                                        </svg>
                                                                    ) : (
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="none">
                                                                            <path d="M6.06402 15.28C5.99197 15.2815 5.9207 15.2649 5.85681 15.2317C5.79291 15.1984 5.73844 15.1497 5.69844 15.0899L2.31348 10.4774C1.28973 9.32358 0.679327 7.8634 0.578125 6.32617C0.578723 4.87181 1.15844 3.47718 2.18986 2.44879C3.22129 1.4204 4.62003 0.842393 6.07869 0.841797H6.10013C7.55404 0.850991 8.94545 1.43247 9.97143 2.45964C10.9974 3.48682 11.5749 4.87651 11.5781 6.32617C11.4816 7.86574 10.8715 9.32893 9.84502 10.483C9.64757 10.753 6.43637 15.0955 6.43637 15.0955C6.39152 15.1515 6.33497 15.197 6.27065 15.2288C6.20634 15.2607 6.13582 15.2782 6.06402 15.28ZM6.04935 1.75305C4.83536 1.75662 3.67232 2.24004 2.81527 3.09732C1.95822 3.95459 1.47709 5.11574 1.4774 6.32617C1.58869 7.66905 2.1366 8.93899 3.03786 9.94305L6.05838 14.0482C6.90688 12.9029 8.93221 10.1545 9.09356 9.94305C9.99401 8.93869 10.5411 7.66878 10.6518 6.32617C10.6509 5.11591 10.1692 3.95528 9.31219 3.09823C8.45515 2.24118 7.29251 1.75751 6.07869 1.75305H6.04935Z" fill={`${theme === "dark" ? 'white' : '#0B0B0C'}`} />
                                                                            <path d="M6.02588 8.69531C5.46798 8.69531 4.92261 8.53036 4.45873 8.22132C3.99485 7.91228 3.6333 7.47303 3.4198 6.95911C3.2063 6.44519 3.15044 5.87969 3.25928 5.33412C3.36812 4.78855 3.63678 4.28741 4.03127 3.89408C4.42577 3.50074 4.92839 3.23288 5.47557 3.12436C6.02275 3.01583 6.58992 3.07153 7.10535 3.2844C7.62079 3.49727 8.06134 3.85776 8.37129 4.32027C8.68125 4.78279 8.84668 5.32655 8.84668 5.88281C8.84668 6.62874 8.54949 7.34411 8.02049 7.87155C7.49149 8.399 6.774 8.69531 6.02588 8.69531ZM6.02588 3.97706C5.6481 3.97617 5.27855 4.08705 4.964 4.29567C4.64946 4.50429 4.40406 4.80126 4.25887 5.149C4.11368 5.49674 4.07523 5.87961 4.14838 6.24915C4.22154 6.61869 4.40301 6.95828 4.66982 7.22494C4.93663 7.4916 5.2768 7.67334 5.64725 7.74715C6.01771 7.82097 6.4018 7.78353 6.75091 7.6396C7.10002 7.49566 7.39845 7.25168 7.60843 6.93856C7.8184 6.62543 7.93049 6.25723 7.93049 5.88056C7.93019 5.37659 7.72957 4.89328 7.37259 4.5365C7.0156 4.17972 6.53134 3.97855 6.02588 3.97706Z" fill={`${theme === "dark" ? 'white' : '#0B0B0C'}`} />
                                                                        </svg>
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

                            <div className='lg:hidden block mt-[30px]'>
                                <div className='flex gap-[6px]'>
                                    <p className={`sm:text-[12px] text-[10px] font-bold ${theme === "dark" ? 'text-white' : 'text-black'}`}>Disclaimer:</p>
                                    <span className={`sm:text-[12px] text-[10px] ${theme === "dark" ? 'text-white' : 'text-black'}`}>
                                        The information presented on this website, including all pricing, loan & offer details
                                        are made available solely for general information purposes. <span className='underline'>Read More</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* footer */}
            {/* see disclaimers */}
            <div className="fixed bottom-0 left-0 right-0 h-max w-full mt-0">
                <div className="z-50">
                    {/* <DisclaimerPopup theme={theme} /> */}
                </div>
                {/* main footer */}
                <div className={`w-full h-[70px] ${theme === "dark" ? 'bg-[#242424]' : 'bg-white'} px-[35px] flex items-center justify-center`}>
                    <div className="h-[44px] flex items-center justify-center gap-8">
                        <Buttons theme={theme} cardsItems={cardDetails} links="/own-online/product-details" title="back" outline={true} />
                        {/* links="/own-online/finance/summary" */}
                        {/* <Buttons disabled={buttonDisabled === true ? buttonDisabled : null} cardsItems={cardDetails} theme={theme} title="continue" outline={false} /> */}
                        <button disabled={buttonDisabled ? true : null} onClick={() => handleValidity()} type='button' className={`sm:text-[16px] text-[15px] relative z-[5] capitalize ${buttonDisabled ? 'opacity-[0.6]' : 'opacity-1'} xl:w-[150px] md:w-[150px] w-[120px] h-full before:content-[""] before:absolute before:left-0 before:right-0 before:bottom-0 before:top-0 before:md:w-[144px] before:w-[122px] before:h-[44px] before:border-[1px] before:border-[#ff3e5b] before:bg-[#ff3e5b] text-white before:z-[-1] after:content-[""] after:absolute after:md:right-[-3px] after:right-[-10px] after:bottom-0 after:top-0 after:bg-[#ff3e5b] after:w-[2px] after:h-full font-bold`}
                        >
                            continue
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

            {/* handleValidity */}

            {
                openValidity &&
                <div className='w-full h-full fixed top-0 left-0 bottom-0 right-0 z-50'>
                    {/* overlays */}
                    <div onClick={(e) => handleClose(e)} className='z-50 w-full h-full fixed left-0 right-0 top-0 bottom-0 bg-[#0B0B0C] opacity-[0.9]'></div>
                    {/* select place menu content */}

                    {
                        verified === true &&
                        <div className={`transition-opacity w-full h-full flex items-center justify-center`}>
                            <div className={`z-[100] sm:w-[388px] w-[320px] h-max ${theme === "dark" ? 'bg-[#212121]' : 'bg-white'} rounded-[20px] p-[20px] relative border-[1px] border-white overflow-hidden`}>
                                {/* title */}
                                <div className='w-full flex items-center justify-between mb-[10px] relative'>
                                    <h2 className={`${theme === "dark" ? 'text-white' : 'text-black'} font-black md:text-[20px] text-[18px] capitalize`}>Enter Your Mobile Number</h2>
                                    {/* cancle button */}
                                    <div onClick={() => handleClose()} className={`font-bold absolute top-1 right-0 cursor-pointer`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                            <path d="M1 1.5L15 15.5" stroke={`${theme === "dark" ? 'white' : '#0B0B0C'}`} strokeWidth="2" strokeLinecap="round" />
                                            <path d="M15 1.5L1 15.5" stroke={`${theme === "dark" ? 'white' : '#0B0B0C'}`} strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                </div>

                                {/* contents */}
                                <div className='w-full h-max'>

                                    <div className='w-full mt-[6px] mb-[12px]'>
                                        <p className={`${theme === "dark" ? 'text-white' : 'text-black'} 1x1:text-[14px] text-[12px] pl-[5px] relative before:absolute before:content-["*"] before:-left-[1px] before:top-0 before:text-[#FF3E5B]`}>
                                            Mandatory fields
                                        </p>
                                    </div>

                                    {/* send OTPs */}
                                    <form className='w-full h-full' onSubmit={(e) => handleOPTValidity(e)}>
                                        <div className='w-full h-full'>
                                            <InputFields id="otpChecks" type="number" placeholder="Enter Mobile Number" values={getInputValues} maxLength={10} mandatory="*" validity={validity} />
                                            {/* {
                                            validity === true &&
                                            <span className='text-[10px] text-[#FF3E5B] flex items-center gap-[4px] my-[6px]'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.62683 2.45819L14.0126 7.84398C14.0907 7.92209 14.0907 8.04872 14.0126 8.12683L8.62683 13.5126C8.54872 13.5907 8.42209 13.5907 8.34398 13.5126L2.95819 8.12683C2.88008 8.04872 2.88008 7.92209 2.95819 7.84398L8.34399 2.45819C8.42209 2.38008 8.54872 2.38008 8.62683 2.45819ZM7.7783 1.8925C8.16882 1.50198 8.80199 1.50198 9.19251 1.8925L14.5783 7.2783C14.9688 7.66882 14.9688 8.30199 14.5783 8.69251L9.19251 14.0783C8.80199 14.4688 8.16882 14.4688 7.7783 14.0783L2.3925 8.69251C2.00198 8.30199 2.00198 7.66882 2.3925 7.2783L7.7783 1.8925ZM8.88541 5.5854C8.88541 5.36448 8.70632 5.1854 8.48541 5.1854C8.26449 5.1854 8.08541 5.36448 8.08541 5.5854V8.98532C8.08541 9.20623 8.26449 9.38532 8.48541 9.38532C8.70632 9.38532 8.88541 9.20623 8.88541 8.98532V5.5854ZM8.88541 10.4513C8.88542 10.2304 8.70635 10.0513 8.48544 10.0513C8.26452 10.0513 8.08542 10.2303 8.08541 10.4512L8.08541 10.4731C8.08539 10.694 8.26446 10.8731 8.48538 10.8731C8.70629 10.8731 8.88539 10.694 8.88541 10.4731L8.88541 10.4513Z" fill="#FF3E5B" />
                                                </svg>
                                                Please enter 10 digits mobile number
                                            </span>
                                        } */}
                                        </div>

                                        <div className='w-full mt-[8px] mb-[14px]'>
                                            <span className={`sm:text-[12px] text-[10px] ${theme === "dark" ? 'text-white' : 'text-[#342C2C]'}`}>Enter your 10 digit mobile number and click below to continue</span>
                                        </div>

                                        <div className='w-full h-[44px] flex items-center justify-center'>
                                            <Buttons type="submit" theme={theme} title="send OTP" outline={true} />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    }

                    {/* check verified otp */}
                    {
                        verifiedOtp === true &&
                        <div className={`transition-opacity w-full h-full flex items-center justify-center`}>
                            <div className={`z-[100] sm:w-[388px] w-[320px] h-max ${theme === "dark" ? 'bg-[#212121]' : 'bg-white'} rounded-[20px] p-[20px] relative border-[1px] border-white overflow-hidden`}>
                                {/* title */}
                                <div className='w-full flex items-center justify-between mb-[10px] relative'>
                                    <h2 className={`${theme === "dark" ? 'text-white' : 'text-black'} font-black md:text-[20px] text-[18px] capitalize`}>Verify With OTP</h2>
                                    {/* cancle button */}
                                    <div onClick={() => handleClose()} className={`font-bold absolute top-1 right-0 cursor-pointer`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                            <path d="M1 1.5L15 15.5" stroke={`${theme === "dark" ? 'white' : '#0B0B0C'}`} strokeWidth="2" strokeLinecap="round" />
                                            <path d="M15 1.5L1 15.5" stroke={`${theme === "dark" ? 'white' : '#0B0B0C'}`} strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                </div>
                                {/* contents */}
                                <div className='w-full h-max'>
                                    <div className='w-full mt-[6px] mb-[12px]'>
                                        <p className={`${theme === "dark" ? 'text-white' : 'text-black'} 1x1:text-[14px] text-[12px] pl-[5px] relative before:absolute before:content-["*"] before:-left-[1px] before:top-0 before:text-[#FF3E5B]`}>
                                            Mandatory fields
                                        </p>
                                    </div>

                                    <form className='w-full h-full' onSubmit={(e) => handleVerifyOTP(e)}>

                                        <div className='w-full h-full'>
                                            <div className='relative'>
                                                <InputFields disabled={true} placeholder={getInputValues} />
                                                <div onClick={() => { setVerified(true), setVerifiedOtp(false) }} className='absolute right-[14px] top-[30%] cursor-pointer'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M14.1048 2.84809L7.94512 9.11346L7.79997 10.4951L9.10637 10.1432L15.0149 4.1333C15.0244 4.12359 15.0344 4.11432 15.0448 4.10551C15.1573 4.01018 15.2636 3.81532 15.2931 3.56789C15.3221 3.32485 15.2686 3.09834 15.1507 2.94414C15.0429 2.80316 14.8609 2.71493 14.6397 2.70227C14.4216 2.68979 14.2233 2.75493 14.1048 2.84809ZM14.6911 1.80374C15.1117 1.82781 15.5641 2.00309 15.8657 2.39747C16.1571 2.77864 16.2368 3.25524 16.1868 3.67439C16.1382 4.08187 15.9593 4.50062 15.6438 4.77734L9.66242 10.8614C9.60627 10.9185 9.5359 10.9596 9.45857 10.9804L7.40098 11.5347C7.25778 11.5733 7.10476 11.5388 6.99192 11.4425C6.87908 11.3463 6.8209 11.2006 6.8364 11.0531L7.06647 8.86307C7.07711 8.76184 7.12175 8.6672 7.19312 8.59461L13.4798 2.20007C13.4893 2.19036 13.4993 2.18108 13.5097 2.17228C13.8317 1.89933 14.2757 1.77996 14.6911 1.80374ZM1.80078 2.96168C1.80078 2.71315 2.00225 2.51168 2.25078 2.51168H8.86073C9.10926 2.51168 9.31073 2.71315 9.31073 2.96168C9.31073 3.21021 9.10926 3.41168 8.86073 3.41168H2.70078V15.3008H14.3741V9.06222C14.3741 8.81369 14.5755 8.61222 14.8241 8.61222C15.0726 8.61222 15.2741 8.81369 15.2741 9.06222V15.7508C15.2741 15.9993 15.0726 16.2008 14.8241 16.2008H2.25078C2.00225 16.2008 1.80078 15.9993 1.80078 15.7508V2.96168Z" fill="#FF3E5B" />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* validitys */}

                                            <div className={`mt-[16px] w-full h-[42px] p-[10px_16px] rounded-[10px] bg-[#F4F4F4] relative`}>
                                                {
                                                    otp.map((data, index) => {

                                                        return (
                                                            <input
                                                                key={index}
                                                                className={`w-[16px] bg-transparent mr-[6px]`}
                                                                type="text"
                                                                name="otp"
                                                                maxLength={1}
                                                                // value={data}
                                                                onChange={(e) => handleOTPChange(e.target.value, index)}
                                                                onFocus={e => e.target.select()}
                                                                style={{ borderBottom: `1px solid #8E8585` }}
                                                            />
                                                        )
                                                    })
                                                }

                                                {/* timings */}
                                                <div className='absolute right-[14px] top-[30%]'>
                                                    <span className={`text-[#8E8585] text-[12px]`}>
                                                        00:{timesCount}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* {
                                            validity === true &&
                                            <span className='text-[10px] text-[#FF3E5B] flex items-center gap-[4px] my-[6px]'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.62683 2.45819L14.0126 7.84398C14.0907 7.92209 14.0907 8.04872 14.0126 8.12683L8.62683 13.5126C8.54872 13.5907 8.42209 13.5907 8.34398 13.5126L2.95819 8.12683C2.88008 8.04872 2.88008 7.92209 2.95819 7.84398L8.34399 2.45819C8.42209 2.38008 8.54872 2.38008 8.62683 2.45819ZM7.7783 1.8925C8.16882 1.50198 8.80199 1.50198 9.19251 1.8925L14.5783 7.2783C14.9688 7.66882 14.9688 8.30199 14.5783 8.69251L9.19251 14.0783C8.80199 14.4688 8.16882 14.4688 7.7783 14.0783L2.3925 8.69251C2.00198 8.30199 2.00198 7.66882 2.3925 7.2783L7.7783 1.8925ZM8.88541 5.5854C8.88541 5.36448 8.70632 5.1854 8.48541 5.1854C8.26449 5.1854 8.08541 5.36448 8.08541 5.5854V8.98532C8.08541 9.20623 8.26449 9.38532 8.48541 9.38532C8.70632 9.38532 8.88541 9.20623 8.88541 8.98532V5.5854ZM8.88541 10.4513C8.88542 10.2304 8.70635 10.0513 8.48544 10.0513C8.26452 10.0513 8.08542 10.2303 8.08541 10.4512L8.08541 10.4731C8.08539 10.694 8.26446 10.8731 8.48538 10.8731C8.70629 10.8731 8.88539 10.694 8.88541 10.4731L8.88541 10.4513Z" fill="#FF3E5B" />
                                                </svg>
                                                Please enter 10 digits mobile number
                                            </span>
                                        } */}
                                        </div>

                                        <div className='w-full mt-[10px] mb-[18px] flex items-center justify-between'>
                                            {/* resend OTP */}
                                            {/* onClick={() => { setTimer(true), setTimesCount(45) }} */}
                                            <span className={`capitalize cursor-pointer sm:text-[12px] text-[10px] font-[530] ${theme === "dark" ? 'text-white' : 'text-[#342C2C]'} flex items-center gap-[3px]`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                    <path d="M15.2842 8.76725C15.2851 10.3223 14.7302 11.8265 13.7197 13.0085C12.7092 14.1905 11.3095 14.9724 9.77324 15.2133C8.23694 15.4542 6.66513 15.1381 5.34136 14.3221C4.01759 13.5061 3.029 12.2439 2.55394 10.7631C2.07887 9.28242 2.1486 7.68067 2.75054 6.24683C3.35248 4.81299 4.44701 3.64146 5.83668 2.94357C7.22636 2.24569 8.81968 2.06739 10.3292 2.44085C11.8388 2.81431 13.1652 3.71493 14.0692 4.98025" stroke={`${theme === "dark" ? 'white' : '#0B0B0C'}`} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M12.5684 4.98867L14.1734 5.25067L14.4384 3.63867" stroke={`${theme === "dark" ? 'white' : '#0B0B0C'}`} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Resend OTP
                                            </span>
                                            {/* call to get OTP */}
                                            <span className={` capitalize cursor-pointer sm:text-[12px] text-[10px] font-[530] ${theme === "dark" ? 'text-white' : 'text-[#342C2C]'} flex items-center gap-[3px]`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.59689 0.846918C4.77899 0.631612 5.61642 1.19855 6.072 1.95142L6.0757 1.95753C6.39887 2.49156 6.95391 3.40875 6.95391 4.35765C6.95391 4.94082 6.81221 5.39966 6.55344 5.78628C6.3032 6.16017 5.96095 6.43869 5.61752 6.68941C5.44735 6.81365 5.38708 6.93947 5.36791 7.0612C5.34611 7.19961 5.37179 7.37689 5.45466 7.5919C5.62323 8.02927 5.96467 8.46776 6.20424 8.76771C6.33053 8.92583 6.4353 8.99503 6.51529 9.02789C6.59459 9.06048 6.68304 9.07117 6.80034 9.05886C6.92538 9.04574 7.06355 9.00915 7.24419 8.95608C7.26449 8.95011 7.28538 8.94392 7.3068 8.93757C7.46383 8.89104 7.64963 8.83597 7.84189 8.79921C8.73709 8.628 9.50714 8.73371 10.031 9.25845L10.0535 9.28096L10.0726 9.30643C10.1512 9.41149 10.2939 9.59335 10.4557 9.79958C10.5161 9.8766 10.5792 9.95701 10.6427 10.0381C10.8666 10.3244 11.1036 10.6303 11.205 10.7826C11.4721 11.1839 11.9213 12.0923 11.3447 13.2474C10.6996 14.5397 9.42636 15.2008 8.05134 15.2008C6.95779 15.2008 5.82796 14.5641 4.81473 13.6554C3.78864 12.7351 2.81885 11.4801 2.03957 10.1162C1.18759 8.62507 0.699533 7.09884 0.493093 5.81267C0.389882 5.16964 0.35584 4.57902 0.38504 4.07697C0.413643 3.58519 0.505034 3.13858 0.684271 2.81215C1.41594 1.47964 2.71579 1.00738 3.59689 0.846918ZM5.30705 2.41582C5.01089 1.92641 4.51568 1.59021 3.75692 1.72841L3.75691 1.72842C2.9981 1.8666 2.01335 2.2508 1.46805 3.24392C1.38181 3.40099 1.30335 3.69369 1.27802 4.12908C1.2533 4.5542 1.28125 5.07859 1.37625 5.67046C1.56623 6.85408 2.01944 8.27718 2.81592 9.67116C3.55783 10.9696 4.47062 12.1441 5.41142 12.9879C6.36508 13.8432 7.28646 14.3048 8.05134 14.3048C9.13618 14.3048 10.0717 13.7942 10.5447 12.8467C10.9168 12.1011 10.641 11.5504 10.4608 11.2796C10.3832 11.1632 10.173 10.8904 9.93853 10.5906C9.87937 10.515 9.81914 10.4382 9.76038 10.3634C9.60863 10.17 9.46673 9.98909 9.37864 9.87278C9.15305 9.66235 8.74998 9.53767 8.00965 9.67926C7.86391 9.70713 7.72294 9.74878 7.5618 9.79639C7.54024 9.80276 7.51832 9.80923 7.49598 9.8158C7.31821 9.86803 7.10885 9.92733 6.89358 9.94993C6.67058 9.97334 6.42597 9.9596 6.17581 9.85681C5.92635 9.75432 5.7053 9.57724 5.50576 9.32741C5.27677 9.0407 4.84587 8.50011 4.62018 7.91457C4.50592 7.61812 4.429 7.27298 4.48434 6.92158C4.54231 6.5535 4.73895 6.22214 5.09065 5.96537C5.4181 5.72632 5.65213 5.52394 5.81046 5.28738C5.96026 5.06357 6.05941 4.78242 6.05941 4.35765C6.05941 3.69746 5.65531 2.99133 5.30705 2.41582Z" fill={`${theme === "dark" ? 'white' : '#0B0B0C'}`} />
                                                </svg>
                                                Get OTP On Call
                                            </span>
                                        </div>

                                        <div className='w-full h-[44px] flex items-center justify-center'>
                                            <Buttons type="submit" theme={theme} title="Verify" outline={true} />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    }

                    {/* user existing checks */}
                    {
                        userCheck === true &&
                        <div className={`transition-opacity w-full h-full flex items-center justify-center`}>
                            <div className={`z-[100] sm:w-[388px] w-[320px] h-max ${theme === "dark" ? 'bg-[#212121]' : 'bg-white'} rounded-[20px] p-[20px] relative border-[1px] border-white overflow-hidden`}>
                                {/* title */}
                                <div className='w-full flex items-center justify-between mb-[10px] relative'>
                                    <h2 className={`${theme === "dark" ? 'text-white' : 'text-black'} font-black md:text-[20px] text-[18px] capitalize`}>Additional Details</h2>
                                    {/* cancle button */}
                                    <div onClick={() => handleClose()} className={`font-bold absolute top-1 right-0 cursor-pointer`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                            <path d="M1 1.5L15 15.5" stroke={`${theme === "dark" ? 'white' : '#0B0B0C'}`} strokeWidth="2" strokeLinecap="round" />
                                            <path d="M15 1.5L1 15.5" stroke={`${theme === "dark" ? 'white' : '#0B0B0C'}`} strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                </div>

                                {/* contents */}
                                <div className='w-full h-max'>
                                    <div className='w-full mt-[6px] mb-[12px]'>
                                        <p className={`${theme === "dark" ? 'text-white' : 'text-black'} 1x1:text-[14px] text-[12px] pl-[5px] relative before:absolute before:content-["*"] before:-left-[1px] before:top-0 before:text-[#FF3E5B]`}>
                                            Mandatory fields
                                        </p>
                                    </div>

                                    <form className='w-full h-full' onSubmit={(e) => handleSubmits(e)}>
                                        <div className='w-full h-max flex flex-col gap-[16px]'>
                                            <InputFields disabled={true} placeholder={"+91" + getInputValues} />
                                            {/* name fields */}
                                            <div className='w-full'>
                                                <InputFields id="nameChecks" type="text" placeholder="Enter Name" mandatory="*" validity={userName} />
                                                {
                                                    userName === true &&
                                                    <span className='text-[10px] text-[#FF3E5B] flex items-center gap-[4px] mt-[6px]'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.62683 2.45819L14.0126 7.84398C14.0907 7.92209 14.0907 8.04872 14.0126 8.12683L8.62683 13.5126C8.54872 13.5907 8.42209 13.5907 8.34398 13.5126L2.95819 8.12683C2.88008 8.04872 2.88008 7.92209 2.95819 7.84398L8.34399 2.45819C8.42209 2.38008 8.54872 2.38008 8.62683 2.45819ZM7.7783 1.8925C8.16882 1.50198 8.80199 1.50198 9.19251 1.8925L14.5783 7.2783C14.9688 7.66882 14.9688 8.30199 14.5783 8.69251L9.19251 14.0783C8.80199 14.4688 8.16882 14.4688 7.7783 14.0783L2.3925 8.69251C2.00198 8.30199 2.00198 7.66882 2.3925 7.2783L7.7783 1.8925ZM8.88541 5.5854C8.88541 5.36448 8.70632 5.1854 8.48541 5.1854C8.26449 5.1854 8.08541 5.36448 8.08541 5.5854V8.98532C8.08541 9.20623 8.26449 9.38532 8.48541 9.38532C8.70632 9.38532 8.88541 9.20623 8.88541 8.98532V5.5854ZM8.88541 10.4513C8.88542 10.2304 8.70635 10.0513 8.48544 10.0513C8.26452 10.0513 8.08542 10.2303 8.08541 10.4512L8.08541 10.4731C8.08539 10.694 8.26446 10.8731 8.48538 10.8731C8.70629 10.8731 8.88539 10.694 8.88541 10.4731L8.88541 10.4513Z" fill="#FF3E5B" />
                                                        </svg>
                                                        Please enter a user name
                                                    </span>
                                                }
                                            </div>
                                            {/* email fields */}
                                            <div className='w-full'>
                                                <InputFields id="emailChecks" type="email" placeholder="Enter Email" mandatory="*" validity={userEmail} />
                                                {
                                                    userEmail === true &&
                                                    <span className='text-[10px] text-[#FF3E5B] flex items-center gap-[4px] mt-[6px]'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.62683 2.45819L14.0126 7.84398C14.0907 7.92209 14.0907 8.04872 14.0126 8.12683L8.62683 13.5126C8.54872 13.5907 8.42209 13.5907 8.34398 13.5126L2.95819 8.12683C2.88008 8.04872 2.88008 7.92209 2.95819 7.84398L8.34399 2.45819C8.42209 2.38008 8.54872 2.38008 8.62683 2.45819ZM7.7783 1.8925C8.16882 1.50198 8.80199 1.50198 9.19251 1.8925L14.5783 7.2783C14.9688 7.66882 14.9688 8.30199 14.5783 8.69251L9.19251 14.0783C8.80199 14.4688 8.16882 14.4688 7.7783 14.0783L2.3925 8.69251C2.00198 8.30199 2.00198 7.66882 2.3925 7.2783L7.7783 1.8925ZM8.88541 5.5854C8.88541 5.36448 8.70632 5.1854 8.48541 5.1854C8.26449 5.1854 8.08541 5.36448 8.08541 5.5854V8.98532C8.08541 9.20623 8.26449 9.38532 8.48541 9.38532C8.70632 9.38532 8.88541 9.20623 8.88541 8.98532V5.5854ZM8.88541 10.4513C8.88542 10.2304 8.70635 10.0513 8.48544 10.0513C8.26452 10.0513 8.08542 10.2303 8.08541 10.4512L8.08541 10.4731C8.08539 10.694 8.26446 10.8731 8.48538 10.8731C8.70629 10.8731 8.88539 10.694 8.88541 10.4731L8.88541 10.4513Z" fill="#FF3E5B" />
                                                        </svg>
                                                        Please enter a email address
                                                    </span>
                                                }
                                            </div>

                                            <div className='w-full'>
                                                {/* checkbox 1 */}
                                                <div className='w-full flex items-center gap-[12px]'>
                                                    {/* customs checkbox */}
                                                    {/* ${checkValidity === true ? `border-[#FF3E5B]` : ``} */}
                                                    <div onClick={() => setChecked(!checked)} className={`w-[18px] h-[18px] flex items-center justify-center cursor-pointer rounded-[5px] border-[2px] ${theme === "dark" ? ' border-0' : 'border-[#DEDEDE]'} bg-[#F4F4F4]`}>
                                                        <input type="checkbox" className={`appearance-none rounded-[5px] border-[1px] ${theme === "dark" ? 'bg-white border-0' : 'border-[#DEDEDE]'}`} />
                                                        <span className={`${checked ? 'opacity-1' : 'opacity-0'}`}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" viewBox="0 0 11 8" fill="none"><path d="M3.66976 7.44002C3.48551 7.44083 3.30837 7.36897 3.17676 7.24002L0.87676 4.94002C0.803483 4.87726 0.743968 4.80004 0.701952 4.7132C0.659936 4.62635 0.636325 4.53176 0.632602 4.43536C0.628878 4.33895 0.645122 4.24282 0.680314 4.15299C0.715506 4.06316 0.768886 3.98158 0.837105 3.91336C0.905323 3.84514 0.986907 3.79176 1.07673 3.75657C1.16656 3.72138 1.26269 3.70514 1.3591 3.70886C1.4555 3.71258 1.55009 3.73619 1.63694 3.77821C1.72378 3.82023 1.80101 3.87974 1.86376 3.95302L3.65776 5.74702L9.02876 0.447018C9.0933 0.381741 9.17015 0.329917 9.25487 0.294548C9.33958 0.259179 9.43046 0.240967 9.52226 0.240967C9.61406 0.240967 9.70494 0.259179 9.78966 0.294548C9.87437 0.329917 9.95122 0.381741 10.0158 0.447018C10.1461 0.578172 10.2193 0.755588 10.2193 0.940518C10.2193 1.12545 10.1461 1.30286 10.0158 1.43402L4.15176 7.22802C4.09016 7.2944 4.01561 7.34746 3.93271 7.38392C3.84981 7.42038 3.76032 7.43947 3.66976 7.44002Z" fill="#EA3A51"></path></svg>
                                                        </span>
                                                    </div>

                                                    <div className='w-full select-none'>
                                                        <span className={`text-[12px] ${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'}`}>By clicking this, you agree to our <br />
                                                            <b className='underline'>Terms & Conditions</b> and <b className='underline'>Privacy Policy</b></span>
                                                    </div>
                                                </div>

                                                {
                                                    checkValidity === true &&
                                                    <div className='w-full my-[6px] flex items-center gap-[6px]'>
                                                        {/* icons */}
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.12683 1.45855L12.5126 6.84435C12.5907 6.92246 12.5907 7.04909 12.5126 7.12719L7.12683 12.513C7.04872 12.5911 6.92209 12.5911 6.84398 12.513L1.45819 7.12719C1.38008 7.04909 1.38008 6.92246 1.45819 6.84435L6.84399 1.45855C6.92209 1.38045 7.04872 1.38045 7.12683 1.45855ZM6.2783 0.892868C6.66882 0.502344 7.30199 0.502345 7.69251 0.892869L13.0783 6.27867C13.4688 6.66919 13.4688 7.30235 13.0783 7.69288L7.69251 13.0787C7.30199 13.4692 6.66882 13.4692 6.2783 13.0787L0.892502 7.69288C0.501978 7.30235 0.501979 6.66919 0.892503 6.27867L6.2783 0.892868ZM7.38541 4.58576C7.38541 4.36485 7.20632 4.18576 6.98541 4.18576C6.76449 4.18576 6.58541 4.36485 6.58541 4.58576V7.98569C6.58541 8.2066 6.76449 8.38569 6.98541 8.38569C7.20632 8.38569 7.38541 8.2066 7.38541 7.98569V4.58576ZM7.38541 9.45166C7.38542 9.23075 7.20635 9.05165 6.98544 9.05163C6.76452 9.05162 6.58542 9.23069 6.58541 9.4516L6.58541 9.47342C6.58539 9.69434 6.76446 9.87343 6.98538 9.87345C7.20629 9.87347 7.38539 9.69439 7.38541 9.47348L7.38541 9.45166Z" fill="#FF3E5B" />
                                                            </svg>
                                                        </div>

                                                        <span className='sm:text-[14px] text-[12px] text-[#FF3E5B] capitalize'>required</span>
                                                    </div>
                                                }

                                                {/* checkbox 2 */}
                                                <div className='w-full flex items-center gap-[12px] mt-[10px]'>
                                                    {/* customs checkbox */}
                                                    <div onClick={() => setChecked_2(!checked_2)} className={`w-[18px] h-[18px] flex items-center justify-center cursor-pointer rounded-[5px] border-[2px] ${theme === "dark" ? 'bg-white border-0' : 'border-[#DEDEDE]'}`}>
                                                        <input type="checkbox" className={`appearance-none rounded-[5px] border-[1px] ${theme === "dark" ? 'bg-white border-0' : 'border-[#DEDEDE]'}`} />
                                                        <span className={`${checked_2 ? 'opacity-1' : 'opacity-0'}`}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" viewBox="0 0 11 8" fill="none"><path d="M3.66976 7.44002C3.48551 7.44083 3.30837 7.36897 3.17676 7.24002L0.87676 4.94002C0.803483 4.87726 0.743968 4.80004 0.701952 4.7132C0.659936 4.62635 0.636325 4.53176 0.632602 4.43536C0.628878 4.33895 0.645122 4.24282 0.680314 4.15299C0.715506 4.06316 0.768886 3.98158 0.837105 3.91336C0.905323 3.84514 0.986907 3.79176 1.07673 3.75657C1.16656 3.72138 1.26269 3.70514 1.3591 3.70886C1.4555 3.71258 1.55009 3.73619 1.63694 3.77821C1.72378 3.82023 1.80101 3.87974 1.86376 3.95302L3.65776 5.74702L9.02876 0.447018C9.0933 0.381741 9.17015 0.329917 9.25487 0.294548C9.33958 0.259179 9.43046 0.240967 9.52226 0.240967C9.61406 0.240967 9.70494 0.259179 9.78966 0.294548C9.87437 0.329917 9.95122 0.381741 10.0158 0.447018C10.1461 0.578172 10.2193 0.755588 10.2193 0.940518C10.2193 1.12545 10.1461 1.30286 10.0158 1.43402L4.15176 7.22802C4.09016 7.2944 4.01561 7.34746 3.93271 7.38392C3.84981 7.42038 3.76032 7.43947 3.66976 7.44002Z" fill="#EA3A51"></path></svg>
                                                        </span>
                                                    </div>

                                                    <div className='w-full select-none'>
                                                        <span className={`text-[12px] ${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'}`}>WhatsApp Consent</span>
                                                    </div>
                                                </div>

                                                {/* buttons */}
                                                <div className='w-full h-[44px] flex items-center justify-center mt-[25px]'>
                                                    <Buttons type="submit" theme={theme} title="confirm" outline={true} cardsItems={cardDetails} />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    }

                    {/* user exist trues */}

                    {
                        openExistUser === true &&
                        <div className={`transition-opacity w-full h-full flex items-center justify-center`}>
                            <div className={`z-[100] sm:w-[388px] w-[320px] h-max ${theme === "dark" ? 'bg-[#212121]' : 'bg-white'} rounded-[20px] p-[20px] relative border-[1px] border-white overflow-hidden`}>
                                {/* title */}
                                <div className='w-full flex items-center justify-between mb-[20px] relative'>
                                    <h2 className={`${theme === "dark" ? 'text-white' : 'text-black'} font-black md:text-[20px] text-[18px] capitalize`}>Confirm Details</h2>
                                    {/* cancle button */}
                                    <div onClick={() => handleClose()} className={`font-bold absolute top-1 right-0 cursor-pointer`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                            <path d="M1 1.5L15 15.5" stroke={`${theme === "dark" ? 'white' : '#0B0B0C'}`} strokeWidth="2" strokeLinecap="round" />
                                            <path d="M15 1.5L1 15.5" stroke={`${theme === "dark" ? 'white' : '#0B0B0C'}`} strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                </div>

                                {/* contents */}
                                <div className='w-full h-max'>
                                    <form className='w-full h-full' onSubmit={(e) => handleExistUserForm(e)}>
                                        <div className='w-full h-max flex flex-col gap-[16px]'>
                                            <InputFields disabled={true} placeholder={"+91" + getInputValues} />
                                            <InputFields id="nameChecks" values={getExistUserName} type="text" placeholder="Enter Name" mandatory="*" validity={userName} />
                                            <InputFields id="emailChecks" values={getExistUserEmail} type="email" placeholder="Enter Email" mandatory="*" validity={userEmail} />

                                            <div className='w-full'>
                                                {/* checkbox 1 */}
                                                <div className='w-full flex items-center gap-[12px]'>
                                                    {/* customs checkbox */}
                                                    {/* ${checkValidity === true ? `border-[#FF3E5B]` : ``} */}
                                                    <div onClick={() => { setChecked(!checked), setCheckValidity(false) }} className={`w-[18px] h-[18px] flex items-center justify-center cursor-pointer rounded-[5px] border-[2px] ${theme === "dark" ? ' border-0' : 'border-[#DEDEDE]'} bg-[#F4F4F4]`}>
                                                        <input type="checkbox" className={`appearance-none rounded-[5px] border-[1px] ${theme === "dark" ? 'bg-white border-0' : 'border-[#DEDEDE]'}`} />
                                                        <span className={`${checked ? 'opacity-1' : 'opacity-0'}`}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" viewBox="0 0 11 8" fill="none"><path d="M3.66976 7.44002C3.48551 7.44083 3.30837 7.36897 3.17676 7.24002L0.87676 4.94002C0.803483 4.87726 0.743968 4.80004 0.701952 4.7132C0.659936 4.62635 0.636325 4.53176 0.632602 4.43536C0.628878 4.33895 0.645122 4.24282 0.680314 4.15299C0.715506 4.06316 0.768886 3.98158 0.837105 3.91336C0.905323 3.84514 0.986907 3.79176 1.07673 3.75657C1.16656 3.72138 1.26269 3.70514 1.3591 3.70886C1.4555 3.71258 1.55009 3.73619 1.63694 3.77821C1.72378 3.82023 1.80101 3.87974 1.86376 3.95302L3.65776 5.74702L9.02876 0.447018C9.0933 0.381741 9.17015 0.329917 9.25487 0.294548C9.33958 0.259179 9.43046 0.240967 9.52226 0.240967C9.61406 0.240967 9.70494 0.259179 9.78966 0.294548C9.87437 0.329917 9.95122 0.381741 10.0158 0.447018C10.1461 0.578172 10.2193 0.755588 10.2193 0.940518C10.2193 1.12545 10.1461 1.30286 10.0158 1.43402L4.15176 7.22802C4.09016 7.2944 4.01561 7.34746 3.93271 7.38392C3.84981 7.42038 3.76032 7.43947 3.66976 7.44002Z" fill="#EA3A51"></path></svg>
                                                        </span>
                                                    </div>

                                                    <div className='w-full select-none'>
                                                        <span className={`text-[12px] ${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'}`}>By clicking this, you agree to our <br />
                                                            <b className='underline'>Terms & Conditions</b> and <b className='underline'>Privacy Policy</b></span>
                                                    </div>
                                                </div>

                                                {
                                                    checkValidity === true &&
                                                    <div className='w-full my-[6px] flex items-center gap-[6px]'>
                                                        {/* icons */}
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.62683 1.45819L12.0126 6.84398C12.0907 6.92209 12.0907 7.04872 12.0126 7.12683L6.62683 12.5126C6.54872 12.5907 6.42209 12.5907 6.34398 12.5126L0.958188 7.12683C0.880084 7.04872 0.880083 6.92209 0.958188 6.84398L6.34399 1.45819C6.42209 1.38008 6.54872 1.38008 6.62683 1.45819ZM5.7783 0.892502C6.16882 0.501978 6.80199 0.501979 7.19251 0.892503L12.5783 6.2783C12.9688 6.66882 12.9688 7.30199 12.5783 7.69251L7.19251 13.0783C6.80199 13.4688 6.16882 13.4688 5.7783 13.0783L0.392502 7.69251C0.001978 7.30199 0.00197857 6.66882 0.392503 6.2783L5.7783 0.892502ZM6.88541 4.5854C6.88541 4.36448 6.70632 4.1854 6.48541 4.1854C6.26449 4.1854 6.08541 4.36448 6.08541 4.5854V7.98532C6.08541 8.20623 6.26449 8.38532 6.48541 8.38532C6.70632 8.38532 6.88541 8.20623 6.88541 7.98532V4.5854ZM6.88541 9.45129C6.88542 9.23038 6.70635 9.05128 6.48544 9.05127C6.26452 9.05125 6.08542 9.23032 6.08541 9.45124L6.08541 9.47306C6.08539 9.69397 6.26446 9.87307 6.48538 9.87308C6.70629 9.8731 6.88539 9.69403 6.88541 9.47311L6.88541 9.45129Z" fill="#FF3E5B" />
                                                            </svg>
                                                        </div>

                                                        <span className='sm:text-[14px] text-[12px] text-[#FF3E5B] capitalize'>required</span>
                                                    </div>
                                                }

                                                {/* checkbox 2 */}
                                                <div className='w-full flex items-center gap-[12px] mt-[10px]'>
                                                    {/* customs checkbox */}
                                                    <div onClick={() => setChecked_2(!checked_2)} className={`w-[18px] h-[18px] flex items-center justify-center cursor-pointer rounded-[5px] border-[2px] ${theme === "dark" ? 'border-0' : 'border-[#DEDEDE]'} bg-[#F4F4F4]`}>
                                                        <input type="checkbox" className={`appearance-none rounded-[5px] border-[1px] ${theme === "dark" ? 'border-0' : 'border-[#DEDEDE]'}`} />
                                                        <span className={`${checked_2 ? 'opacity-1' : 'opacity-0'}`}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                                                                <path d="M3.24506 6.07995C3.10687 6.08056 2.97401 6.02667 2.87531 5.92995L1.15031 4.20495C1.09535 4.15789 1.05071 4.09997 1.0192 4.03484C0.987689 3.9697 0.969981 3.89876 0.967188 3.82646C0.964395 3.75415 0.976578 3.68205 1.00297 3.61468C1.02937 3.54731 1.0694 3.48612 1.12057 3.43496C1.17173 3.3838 1.23292 3.34376 1.30029 3.31737C1.36766 3.29097 1.43976 3.27879 1.51206 3.28158C1.58436 3.28438 1.65531 3.30208 1.72044 3.3336C1.78558 3.36511 1.84349 3.40974 1.89056 3.4647L3.23606 4.8102L7.26431 0.835203C7.31271 0.786245 7.37035 0.747377 7.43389 0.72085C7.49742 0.694323 7.56558 0.680664 7.63443 0.680664C7.70328 0.680664 7.77145 0.694323 7.83498 0.72085C7.89851 0.747377 7.95615 0.786245 8.00456 0.835203C8.10234 0.933568 8.15722 1.06663 8.15722 1.20533C8.15722 1.34402 8.10234 1.47709 8.00456 1.57545L3.60656 5.92095C3.56035 5.97074 3.50444 6.01053 3.44227 6.03788C3.3801 6.06523 3.31298 6.07954 3.24506 6.07995Z" fill="#EA3A51" />
                                                            </svg>
                                                        </span>
                                                    </div>

                                                    <div className='w-full select-none'>
                                                        <span className={`text-[12px] ${theme === "dark" ? 'text-white' : 'text-[#0B0B0C]'}`}>WhatsApp Consent</span>
                                                    </div>
                                                </div>

                                                {/* buttons */}
                                                <div className='w-full h-[44px] flex items-center justify-center mt-[25px]'>
                                                    <Buttons type="submit" theme={theme} title="confirm" outline={true} cardsItems={cardDetails} />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default Index