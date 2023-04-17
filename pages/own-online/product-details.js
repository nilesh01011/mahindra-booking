import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Buttons from "../components/Buttons";
import ChooseConfig from "../components/ChooseConfig";
import SelectStateCity from "../components/SelectStateCity";
import Steppers from "../components/Steppers";
import DisclaimerPopup from "../components/DisclaimerPopup";
import Head from "next/head";
import Navbar from "../components/navbar/Navbar";

function ProductDetails() {
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

    const [cardDetails, setCardDetails] = useState([]);
    const [colorChoise, setColorChoise] = useState([]);
    const [seater, setSeater] = useState([]);
    const [carType, setCarType] = useState([]);
    const [transmission, setTransmission] = useState([]);
    const [toggleColorChoise, setToggleColorChoise] = useState(1);
    const [colorName, setColorName] = useState('');

    const router = useRouter();

    useEffect(() => {
        const getCardDetails = localStorage.getItem('cardsDetails');

        if (!getCardDetails) {
            router.push('/own-online/model-selection')
        } else {
            setCardDetails(JSON.parse(getCardDetails))
        }

    }, [router])

    // cars seaters
    useEffect(() => {
        setSeater(cardDetails.chooseSeaters)
    }, [cardDetails.chooseSeaters])

    // car types petrol or diesel
    useEffect(() => {
        setCarType(cardDetails.choosePetrolDiesel)
    }, [cardDetails.choosePetrolDiesel])

    // chooseTransmission
    useEffect(() => {
        setTransmission(cardDetails.chooseTransmission)
    }, [cardDetails.chooseTransmission])

    // color select
    useEffect(() => {
        setColorChoise(cardDetails.colorChoose)
    }, [cardDetails.colorChoose],)

    const handleColorChange = (ele) => {
        setToggleColorChoise(ele.id);
        setColorName(ele.color)
    }

    const [isContentShow, setIsContentShow] = useState(1);

    const [isChooseVariant, setIsChooseVariant] = useState([]);

    const [isFirstActive, setIsFirstActive] = useState(1)
    const [lengthCheck, setLengthCheck] = useState(0)

    const handleChooseVariant = (id) => {
        setIsFirstActive(id)

        setIsContentShow(id);
    }


    useEffect(() => {
        setIsChooseVariant(cardDetails.chooseVariant)

        const lengthChentVariant = isChooseVariant && isChooseVariant.map((ele) => {
            setLengthCheck(isChooseVariant.length);
        })
    }, [cardDetails.chooseVariant, isChooseVariant]);

    const themeColors = `${theme === "dark" ? 'text-white' : 'text-black'}`;

    useEffect(() => {
        document.body.style.backgroundColor = `${theme === "light" ? '#F4F4F4' : '#0B0B0C'}`
    }, [theme])

    const carImages = cardDetails ? cardDetails.imgSrc : null;

    return (
        <>
            <Head>
                <title>Mahindra {cardDetails.title} Variant</title>
                <meta name="description" content="Variant Product Details" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* main content */}

            <Navbar theme={theme} />

            <div className='w-full h-full md:pt-[10px] max-w-[1200px] mx-auto xl:px-0 px-[15px]'>
                {/* steppers */}
                <div className='w-full h-[30px] flex justify-center'>
                    <Steppers Steps={1} />
                </div>

                {/* main cars details */}
                <div className="w-full h-full flex lg:flex-row flex-col justify-between sm:mt-[45px] mt-[32px] mb-[25px]">
                    {/* left side cars details */}
                    <div className="lg:w-[45%] w-full h-full flex flex-col">
                        {/* select state and city */}
                        <div>
                            <SelectStateCity theme={theme} />
                        </div>
                        <div className="w-full">
                            {/* cars title */}
                            <div className="w-full pb-[10px] sm:pt-[10px] pt-[5px] flex items-center justify-between">
                                {/* title */}
                                <h2 className={`${themeColors} md:text-[24px] text-[20px] font-[800] uppercase`}>{cardDetails.title}</h2>
                                {/* 360 Deg */}
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="37" viewBox="0 0 36 37" fill="none">
                                        <path d="M35.1155 27.4239C34.0731 26.579 32.8625 25.9694 31.5657 25.6364C31.3867 25.5893 31.1965 25.6144 31.0357 25.7064C30.8749 25.7984 30.7562 25.9499 30.7048 26.1288C30.642 26.3026 30.6475 26.4941 30.7202 26.664C30.7928 26.8339 30.9272 26.9696 31.0958 27.0433C31.2752 27.1278 31.4711 27.1807 31.655 27.2487C32.4954 27.5087 33.2848 27.9131 33.9882 28.4441C34.6637 29.0037 34.6712 29.4583 33.9792 29.9831C33.5956 30.2723 33.1822 30.5191 32.7462 30.7194C30.8173 31.5451 28.7821 32.0925 26.701 32.3453C25.5332 32.522 24.3557 32.63 23.1826 32.7734C22.9858 32.7847 22.8014 32.8741 22.6699 33.0221C22.5385 33.17 22.4708 33.3644 22.4816 33.5625C22.4924 33.7607 22.581 33.9464 22.7277 34.0789C22.8745 34.2114 23.0675 34.28 23.2645 34.2694C23.3816 34.2722 23.4988 34.2659 23.6149 34.2505C25.5002 33.9726 27.3929 33.7363 29.2676 33.398C30.8868 33.1303 32.4539 32.6071 33.9109 31.8476C34.3957 31.6373 34.8317 31.3278 35.1913 30.9388C35.5508 30.5498 35.8261 30.0899 35.9996 29.5882V28.8791C35.853 28.3173 35.5456 27.8112 35.1155 27.4239Z" fill={`${theme === "dark" ? 'white' : 'black'}`} />
                                        <path d="M7.50782 24.3361C7.50782 25.1048 7.58287 25.2189 8.27932 25.4885C11.4104 26.7043 14.5399 27.9246 17.6762 29.1268C17.8941 29.2009 18.1304 29.199 18.3472 29.1216C21.5052 27.9133 24.6566 26.6793 27.8094 25.4545C28.3767 25.234 28.4931 25.0678 28.4938 24.4546C28.4938 22.5179 28.4938 20.5811 28.4938 18.6444H28.5096C28.5096 16.6372 28.5096 14.6299 28.5096 12.6227C28.5224 12.4497 28.4762 12.2774 28.3787 12.1344C28.2811 11.9913 28.138 11.886 27.973 11.8358C24.8089 10.6109 21.6448 9.38481 18.4808 8.15741C18.3305 8.09444 18.1693 8.06201 18.0064 8.06201C17.8436 8.06201 17.6824 8.09444 17.5321 8.15741C14.3706 9.38833 11.2067 10.6145 8.04067 11.8358C7.87013 11.8859 7.72225 11.9942 7.62242 12.1421C7.52258 12.2899 7.47702 12.4681 7.49355 12.6461C7.49355 12.8583 7.50707 13.0705 7.50782 13.2835C7.50782 16.9677 7.50782 20.6521 7.50782 24.3368V24.3361ZM27.0003 13.6966V14.0364C27.0003 17.2957 27.0003 20.555 27.0003 23.8143C27.0003 24.031 26.9778 24.1669 26.7324 24.2606C24.1522 25.2476 21.5795 26.2519 19.0023 27.2503C18.9386 27.2752 18.8703 27.2888 18.7524 27.322V26.992C18.7524 23.7327 18.7524 20.4734 18.7524 17.2141C18.7524 16.9974 18.7749 16.8531 19.0196 16.761C21.5991 15.7725 24.1725 14.7696 26.7497 13.7713C26.8247 13.7426 26.8998 13.726 27.0011 13.6958L27.0003 13.6966ZM13.2078 11.4582C14.7133 10.8745 16.2173 10.2862 17.7265 9.7123C17.8852 9.64976 18.06 9.64232 18.2233 9.69115C20.6394 10.6135 23.052 11.5448 25.4611 12.4853C25.5136 12.5139 25.5638 12.5467 25.6112 12.5834L23.4648 13.4141C21.7386 14.084 20.0193 14.7576 18.2916 15.4176C18.1344 15.4811 17.9607 15.4902 17.7978 15.4432C15.3715 14.5159 12.9504 13.5735 10.5285 12.634C10.4963 12.6212 10.4663 12.6031 10.3664 12.554L13.2078 11.4582ZM9.00505 13.8899C9.00505 13.831 9.0118 13.7728 9.0178 13.6724L14.4258 15.7687C15.2769 16.0987 16.1257 16.4333 16.9775 16.7542C17.0614 16.7719 17.1358 16.8203 17.1861 16.8901C17.2365 16.9599 17.2592 17.0461 17.2499 17.1318C17.2424 20.4495 17.2404 23.7672 17.2439 27.0849C17.2439 27.143 17.2349 27.2004 17.2274 27.2956C17.1372 27.2771 17.048 27.2536 16.9603 27.2253C14.3956 26.2325 11.8309 25.2398 9.26622 24.247C9.18315 24.2303 9.10931 24.1829 9.05929 24.1141C9.00927 24.0453 8.9867 23.9601 8.99604 23.8754C9.00454 20.5462 9.00655 17.2166 9.00204 13.8869" fill={`${theme === "dark" ? 'white' : 'black'}`} />
                                        <path d="M19.1941 33.1413C18.2034 32.3687 17.1978 31.6151 16.1921 30.8667C16.0568 30.759 15.8871 30.7044 15.7147 30.7133C15.5424 30.7222 15.3792 30.7939 15.2555 30.915C15.1716 30.99 15.1057 31.0831 15.0628 31.1874C15.0198 31.2917 15.001 31.4045 15.0076 31.5171C15.0143 31.6298 15.0462 31.7395 15.1011 31.838C15.156 31.9364 15.2324 32.0211 15.3245 32.0855C15.6735 32.3695 16.039 32.6345 16.472 32.9645C16.3122 32.9645 16.2566 32.9645 16.2011 32.9645C13.3205 32.898 10.4502 32.5931 7.61924 32.0531C6.00123 31.7837 4.42949 31.2844 2.95118 30.5699C2.50901 30.3317 2.09997 30.0359 1.73463 29.6901C1.66006 29.6339 1.59954 29.5609 1.55786 29.477C1.51617 29.3931 1.49447 29.3006 1.49447 29.2068C1.49447 29.113 1.51617 29.0205 1.55786 28.9367C1.59954 28.8528 1.66006 28.7798 1.73463 28.7235C1.95032 28.475 2.20763 28.2665 2.49488 28.1073C3.25062 27.7403 4.02963 27.4201 4.80564 27.0962C4.99131 27.0365 5.14777 26.9086 5.24378 26.7379C5.33978 26.5673 5.36824 26.3665 5.32348 26.1756C5.27141 25.985 5.14792 25.8222 4.97898 25.7213C4.81004 25.6205 4.60882 25.5895 4.41764 25.6349C3.15549 25.9631 1.97549 26.5531 0.953366 27.3672C0.656549 27.5758 0.414651 27.854 0.248563 28.1777C0.0824751 28.5014 -0.00281076 28.8609 7.06586e-05 29.2252C0.00295208 29.5894 0.0939141 29.9475 0.265102 30.2685C0.436289 30.5895 0.682556 30.8638 0.982635 31.0676C1.74695 31.6949 2.61958 32.1751 3.55682 32.4842C6.72772 33.5364 10.0245 34.1561 13.359 34.3269C14.3714 34.4084 15.3853 34.4409 16.4938 34.5005C16.0548 34.8336 15.6758 35.1092 15.3103 35.403C15.2287 35.4606 15.1595 35.534 15.1067 35.619C15.0538 35.704 15.0184 35.7988 15.0027 35.8978C14.9869 35.9968 14.9909 36.098 15.0147 36.1953C15.0384 36.2927 15.0813 36.3843 15.1408 36.4647C15.2004 36.5451 15.2753 36.6127 15.3612 36.6634C15.4472 36.7142 15.5423 36.7471 15.6411 36.7602C15.7399 36.7733 15.8403 36.7663 15.9363 36.7397C16.0324 36.713 16.1222 36.6673 16.2004 36.6052C17.201 35.8646 18.1944 35.1145 19.1806 34.3548C19.2809 34.2895 19.3635 34.2003 19.4212 34.0951C19.4789 33.9898 19.5098 33.8718 19.5111 33.7517C19.5124 33.6315 19.4842 33.5129 19.4289 33.4063C19.3735 33.2998 19.2929 33.2088 19.1941 33.1413Z" fill={`${theme === "dark" ? 'white' : 'black'}`} />
                                        <path d="M12.2869 6.00512C12.087 6.00708 11.8875 5.98554 11.6925 5.94093C11.523 5.90139 11.3582 5.84366 11.201 5.76875C11.06 5.70152 10.9267 5.61924 10.8032 5.52332C10.6903 5.43541 10.5855 5.33734 10.4902 5.23032L10.8497 4.76513C11.0214 4.94109 11.2155 5.09344 11.4268 5.21823C11.6763 5.35778 11.9589 5.42619 12.2441 5.41609C12.5384 5.42951 12.8274 5.33445 13.0569 5.14876C13.1618 5.05825 13.2448 4.94493 13.2996 4.81736C13.3545 4.68979 13.3798 4.55134 13.3736 4.41247C13.3752 4.25996 13.3445 4.10885 13.2836 3.96919C13.2186 3.82806 13.1166 3.70744 12.9886 3.6203C12.8253 3.51043 12.6423 3.43349 12.4498 3.39376C12.1797 3.33805 11.9043 3.31272 11.6287 3.31824V2.77603C11.8748 2.78169 12.1206 2.75632 12.3605 2.70051C12.5323 2.66021 12.6948 2.58715 12.8393 2.48529C12.9547 2.40271 13.0451 2.28951 13.1004 2.1583C13.1516 2.02964 13.1771 1.8921 13.1755 1.75354C13.1816 1.6354 13.1622 1.51734 13.1187 1.40746C13.0751 1.29758 13.0085 1.19847 12.9233 1.11693C12.7318 0.953962 12.4855 0.871 12.2351 0.885097C12.0159 0.882823 11.7996 0.936059 11.6062 1.03991C11.4093 1.14775 11.2293 1.28413 11.0719 1.44467L10.6966 0.996861C10.9039 0.798782 11.1388 0.632154 11.3938 0.502228C11.664 0.369502 11.9616 0.303242 12.2621 0.308906C12.4853 0.306382 12.7075 0.338215 12.9211 0.403301C13.1091 0.460202 13.2847 0.552169 13.4389 0.674406C13.5835 0.791079 13.6991 0.939995 13.7766 1.10938C13.8597 1.29617 13.9007 1.49911 13.8967 1.7037C13.9086 2.00095 13.811 2.29215 13.6228 2.52154C13.4277 2.7427 13.1808 2.91141 12.9046 3.0124V3.04713C13.0656 3.08565 13.221 3.14505 13.3669 3.22384C13.5071 3.30003 13.6339 3.39904 13.7421 3.51685C13.8497 3.63483 13.9342 3.77214 13.9913 3.92162C14.053 4.08664 14.0836 4.26183 14.0813 4.43815C14.0846 4.66412 14.0363 4.88784 13.9402 5.09212C13.8492 5.28319 13.7178 5.45198 13.5552 5.58675C13.3865 5.72488 13.1936 5.8299 12.9864 5.89637C12.7604 5.96982 12.5243 6.00653 12.2869 6.00512ZM16.8124 6.00512C16.5551 6.00747 16.3007 5.95146 16.0679 5.84125C15.8332 5.72676 15.6293 5.55711 15.4735 5.34661C15.2918 5.09805 15.157 4.81802 15.0757 4.52046C14.9725 4.14329 14.9235 3.75319 14.9301 3.36204C14.9205 2.88703 14.9781 2.41307 15.1013 1.95441C15.1933 1.61172 15.3502 1.29016 15.5636 1.00743C15.7386 0.778485 15.9659 0.59535 16.2262 0.473532C16.4724 0.362386 16.7392 0.305483 17.009 0.30664C17.2739 0.299469 17.5366 0.356992 17.7745 0.474287C17.9809 0.580577 18.1674 0.721846 18.3261 0.891893L17.9329 1.33064C17.8199 1.1995 17.6818 1.09264 17.5268 1.0165C17.3739 0.939869 17.2054 0.900057 17.0345 0.9002C16.8482 0.899876 16.6642 0.941143 16.4957 1.02103C16.3142 1.11167 16.1591 1.24798 16.0454 1.41673C15.8983 1.6356 15.7911 1.87903 15.7287 2.13565C15.64 2.49454 15.5959 2.8631 15.5973 3.2329C15.7619 3.02622 15.9661 2.85493 16.1977 2.72921C16.404 2.61176 16.6362 2.54815 16.8732 2.54419C17.0806 2.53408 17.2879 2.56627 17.4826 2.63881C17.6774 2.71135 17.8555 2.82276 18.0064 2.96633C18.1581 3.13934 18.2737 3.34127 18.3463 3.56013C18.4189 3.77898 18.447 4.01029 18.4289 4.24029C18.4323 4.48599 18.3887 4.73005 18.3006 4.95921C18.2208 5.16541 18.1017 5.35395 17.9501 5.51426C17.8043 5.66757 17.6298 5.79048 17.4368 5.87598C17.24 5.96268 17.0272 6.00668 16.8124 6.00512ZM16.8124 5.44554C16.9427 5.44694 17.0715 5.41745 17.1884 5.35945C17.3047 5.30039 17.4068 5.21666 17.4878 5.11402C17.5769 5.00138 17.6451 4.87347 17.689 4.73644C17.7402 4.57669 17.7656 4.40967 17.764 4.24181C17.7812 3.93754 17.6935 3.63663 17.5156 3.38998C17.4215 3.2813 17.3035 3.19623 17.171 3.14155C17.0385 3.08688 16.8951 3.06412 16.7523 3.07508C16.5503 3.08207 16.3532 3.13969 16.179 3.24272C15.9487 3.37873 15.755 3.56926 15.6146 3.79777C15.6263 4.23407 15.7549 4.65909 15.9868 5.02793C16.079 5.16121 16.2028 5.26921 16.3469 5.34214C16.4911 5.41506 16.6511 5.45061 16.8124 5.44554ZM20.9018 6.00512C20.64 6.0109 20.3816 5.94512 20.154 5.8148C19.9264 5.68448 19.7382 5.49448 19.6095 5.26505C19.2638 4.61252 19.1038 3.87666 19.1472 3.13851C19.1023 2.40579 19.2625 1.67509 19.6095 1.02933C19.741 0.803794 19.9302 0.617816 20.1573 0.490726C20.3844 0.363636 20.6412 0.300073 20.9011 0.30664C21.1596 0.300771 21.415 0.364708 21.6407 0.491802C21.8664 0.618896 22.0541 0.804506 22.1844 1.02933C22.5314 1.67509 22.6916 2.40579 22.6467 3.13851C22.69 3.87666 22.5301 4.61252 22.1844 5.26505C22.0569 5.4936 21.8703 5.68311 21.6443 5.81342C21.4183 5.94374 21.1615 6.00998 20.9011 6.00512H20.9018ZM20.9018 5.43723C21.0559 5.43875 21.2067 5.39204 21.3333 5.30357C21.4773 5.1951 21.5918 5.05204 21.6666 4.88747C21.7732 4.66117 21.8467 4.42056 21.885 4.17309C21.9398 3.83006 21.9649 3.48289 21.96 3.13549C21.965 2.78959 21.9399 2.44391 21.885 2.10242C21.8474 1.85892 21.7737 1.62244 21.6666 1.40087C21.5903 1.24144 21.4754 1.10383 21.3326 1.00064C21.2048 0.91468 21.0541 0.869663 20.9003 0.871503C20.7455 0.870159 20.5937 0.915102 20.4643 1.00064C20.3194 1.10268 20.2031 1.24052 20.1265 1.40087C20.0194 1.62244 19.9457 1.85892 19.9082 2.10242C19.8532 2.44391 19.8281 2.78959 19.8331 3.13549C19.7942 3.7345 19.8947 4.33438 20.1265 4.88747C20.1898 5.04403 20.2964 5.179 20.4337 5.27633C20.5711 5.37366 20.7333 5.42924 20.9011 5.43648L20.9018 5.43723ZM24.4434 2.20966C24.3045 2.2109 24.1666 2.18526 24.0374 2.13414C23.9105 2.08336 23.7943 2.00879 23.6951 1.91439C23.5927 1.81592 23.5121 1.69677 23.4587 1.56475C23.3999 1.42113 23.3708 1.26696 23.3732 1.11165C23.3704 0.953854 23.3995 0.797143 23.4587 0.650995C23.513 0.520017 23.5929 0.401364 23.6936 0.302109C23.7917 0.20456 23.908 0.127557 24.0359 0.0755595C24.1651 0.0244377 24.303 -0.00119966 24.4419 4.31109e-05C24.5808 -0.00119966 24.7186 0.0244377 24.8479 0.0755595C24.9757 0.127557 25.0921 0.20456 25.1901 0.302109C25.2909 0.401364 25.3708 0.520017 25.425 0.650995C25.4842 0.797143 25.5133 0.953854 25.5106 1.11165C25.5129 1.26696 25.4838 1.42113 25.425 1.56475C25.3714 1.69474 25.2914 1.81203 25.1901 1.9091C25.0909 2.0035 24.9748 2.07808 24.8479 2.12885C24.7192 2.18143 24.5816 2.20861 24.4426 2.2089L24.4434 2.20966ZM24.4434 1.81395C24.5301 1.81652 24.6163 1.80017 24.6961 1.76602C24.7759 1.73186 24.8474 1.68072 24.9057 1.6161C25.0272 1.47918 25.0914 1.30036 25.085 1.11693C25.0934 0.927963 25.0292 0.743001 24.9057 0.600399C24.8474 0.53578 24.7759 0.484634 24.6961 0.450479C24.6163 0.416324 24.5301 0.399971 24.4434 0.402546C24.3567 0.399971 24.2705 0.416324 24.1907 0.450479C24.1109 0.484634 24.0394 0.53578 23.9811 0.600399C23.8576 0.743001 23.7933 0.927963 23.8017 1.11693C23.7953 1.30036 23.8596 1.47918 23.9811 1.6161C24.0393 1.68048 24.1108 1.73143 24.1904 1.76545C24.2701 1.79947 24.3561 1.81575 24.4426 1.81319L24.4434 1.81395Z" fill={`${theme === "dark" ? 'white' : 'black'}`} />
                                    </svg>
                                </div>
                            </div>
                            {/* cars images */}
                            <div className="sm:w-[425px] w-[280px] mx-auto sm:h-[343px] h-[160px] md:mt-0 mt-[5px]">
                                {
                                    carImages &&
                                    <Image width={425} height={343} src={carImages} alt="product-img" className='w-full max-w-[425px] h-full max-h-[343px] sm:object-contain object-cover' />
                                }
                            </div>
                        </div>
                    </div>
                    {/* right side select configurations */}
                    <div className="lg:w-[53%] w-full h-max lg:mb-0]">
                        {/* tabs for fuel or diesel */}
                        <div className="w-full px-[4px]">
                            <div className="w-full">
                                {/* config title */}
                                <div className="w-full">
                                    <h3 className={`text-[18px] font-bold text-left ${themeColors}`}>Choose Configuration</h3>
                                </div>

                                {/* choose config tabs */}
                                <div className="w-full grid grid-cols-3 sm:gap-[20px] gap-[10px] mt-[12px]">
                                    <ChooseConfig theme={theme} title="fuel" contents={carType} />
                                    <ChooseConfig theme={theme} title="transmission" contents={transmission} />
                                    {/* contentOne="5 Seater" contentTwo="7 Seater" */}
                                    <ChooseConfig theme={theme} title="seating" contents={seater} />
                                </div>
                            </div>
                        </div>

                        {/* color selections */}
                        <div className="w-full my-[16px] px-[4px]">
                            {/* colors title */}
                            <div className="w-full mb-[12px]">
                                <h3 className={`text-[18px] ${themeColors} font-bold text-left`}>Choose Colour:
                                    <span className="capitalize ml-[5px] text-[14px] font-normal">
                                        {colorName}
                                    </span>
                                </h3>
                            </div>
                            {/* color choose */}
                            <div className={`w-full sm:h-[74px] h-full rounded-[10px] ${theme === "dark" ? 'bg-[#242424]' : 'bg-white'} flex flex-wrap items-center gap-[30px] p-[16px] px-[24px] shadow-md`}>
                                {
                                    colorChoise && colorChoise.map((ele) => {
                                        const { id, color, colorCode } = ele;

                                        if (colorName === '') {
                                            setColorName(`${colorChoise[0].color}`)
                                        }

                                        return (
                                            <button key={id} onClick={() => handleColorChange(ele)} type="button" className={`w-[28px] h-[28px] rounded-full border ${theme === "dark" ? 'border-white' : 'border-[#8E8585]'} ${toggleColorChoise === id ? `outline ${theme === "dark" ? 'outline-white' : 'outline-[#8E8585]'} outline-1 outline-offset-[6px]` : 'outline-0 outline-offset-0'}`} style={{ background: `${colorCode}` }}></button>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        {/* choose variant */}
                        <div className="w-full sm:mb-[90px] mb-[16px]">
                            {/* choose variant title */}
                            <div className="w-full mb-[12px] px-[4px]">
                                <h3 className={`text-[18px] font-bold text-left ${themeColors}`}>Choose  Variant ({lengthCheck})</h3>
                            </div>
                            <div id="overFlowNone" className={`w-full ${lengthCheck <= 1 ? 'h-max' : 'h-[190px] overflow-scroll'} flex flex-col gap-[16px] p-[4px]`}>
                                {
                                    isChooseVariant && isChooseVariant.map((ele) => {
                                        const { id, title, price, lists } = ele;

                                        {/* box */ }
                                        return (
                                            <div onClick={() => handleChooseVariant(id)} key={id} className={`w-full ${isFirstActive === id ? 'h-max' : 'h-[82px]'} rounded-[10px] divide-y-[1px] shadow-md ${theme === "dark" ? 'bg-[#242424] divide-[#8E8585]' : 'bg-white divide-[#DEDEDE]'} cursor-pointer`}>
                                                {/* title and prices */}
                                                <div className="w-full flex sm:items-center items-start sm:justify-between sm:flex-row flex-col p-[16px]">
                                                    {/* title and icons */}
                                                    <div className="flex items-center gap-[7px]">
                                                        {/* icons */}
                                                        <div className="w-auto">
                                                            {
                                                                isFirstActive === id ? (
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                                        <path d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z" fill="#FF3E5B" />
                                                                        <path d="M6.59252 12.97C6.377 12.9698 6.17015 12.8851 6.01652 12.734L3.33352 10.051C3.25387 9.97623 3.19006 9.88626 3.14587 9.78639C3.10168 9.68652 3.07801 9.57878 3.07628 9.46959C3.07454 9.36039 3.09476 9.25196 3.13575 9.15073C3.17674 9.0495 3.23766 8.95755 3.31488 8.88032C3.3921 8.8031 3.48406 8.74218 3.58529 8.70119C3.68651 8.66021 3.79495 8.63998 3.90414 8.64172C4.01334 8.64346 4.12108 8.66712 4.22095 8.71131C4.32082 8.7555 4.41079 8.81932 4.48552 8.89896L6.57952 10.993L12.8495 4.80496C12.9248 4.72877 13.0145 4.66828 13.1134 4.62699C13.2123 4.58571 13.3184 4.56445 13.4255 4.56445C13.5327 4.56445 13.6387 4.58571 13.7376 4.62699C13.8365 4.66828 13.9262 4.72877 14.0015 4.80496C14.1525 4.95867 14.2371 5.16551 14.2371 5.38096C14.2371 5.59641 14.1525 5.80325 14.0015 5.95696L7.15552 12.721C7.0837 12.7988 6.99667 12.861 6.89984 12.9038C6.803 12.9467 6.6984 12.9692 6.59252 12.97Z" fill="white" />
                                                                    </svg>
                                                                ) : (
                                                                    <div className={`w-[18px] h-[18px] rounded-full border-[1px] ${theme === "dark" ? 'border-white' : 'border-black'}`}></div>
                                                                )
                                                            }
                                                        </div>
                                                        {/* title */}
                                                        <h4 className={`text-[18px] ${themeColors} font-bold`}>{title}</h4>
                                                    </div>

                                                    {/* prices */}
                                                    <div className="flex gap-[3px] sm:pl-0 pl-[25px]">
                                                        <p className={`mr-1 ${themeColors}`}>Starts at</p>
                                                        <span className={`font-black ${themeColors}`}>₹{new Intl.NumberFormat('en-IN').format(price)}*</span>
                                                    </div>
                                                </div>

                                                {/* contents */}
                                                {
                                                    isContentShow === id &&
                                                    <div className={`${theme === "dark" ? 'text-white' : 'text-black'}  w-full h-max flex sm:flex-row flex-col items-start sm:gap-[15px] gap-[5px] p-[16px] pt-[8px] sm:pl-[16px] pl-[42px]`}>
                                                        {/* left side */}
                                                        <div className="sm:w-[20%] w-full">
                                                            <p className="capitalize font-bold">
                                                                key features
                                                            </p>
                                                        </div>
                                                        {/* right sides */}
                                                        <div className="sm:w-[80%] w-full">
                                                            <ul className="list-disc flex flex-col gap-[4px]">
                                                                {
                                                                    lists.map((el) => {
                                                                        const { id, listName } = el
                                                                        return (
                                                                            <li key={id} className="capitalize text-[14px]">{listName}</li>
                                                                        )
                                                                    })
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="sm:hidden block mb-[70px]">
                            <DisclaimerPopup theme={theme} />
                        </div>
                    </div>
                </div>
            </div>
            {/* footer */}
            {/* see disclaimers */}
            <div className="fixed bottom-0 left-0 right-0 h-max w-full mt-0">
                <div className="z-50 sm:block hidden max-w-[1280px] mx-auto">
                    <DisclaimerPopup theme={theme} />
                </div>
                {/* main footer */}
                <div className={`w-full h-[70px] ${theme === "dark" ? 'bg-[#242424]' : 'bg-white'} px-[35px] flex items-center justify-center`}>
                    <div className="h-[44px] flex items-center justify-center gap-8">
                        <Buttons theme={theme} links="/own-online/model-selection" title="back" outline={true} />
                        <Buttons theme={theme} cardsItems={cardDetails} links="/own-online/dealer" title="continue" outline={false} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetails