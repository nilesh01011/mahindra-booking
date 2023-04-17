import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { BsChevronLeft, BsSearch } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'
import { megaMenuBar } from '../../api/MenuBar'
import { useRouter } from 'next/router'
// import DropDownList from './DropDownList'
import Image from 'next/image'
import { FaChevronRight } from 'react-icons/fa'

function DeskTopNavbar({ theme }) {

    const closeMegaMenu = useRef();

    const [mobileView, setMobileView] = useState(false)
    // URL router paths
    const router = useRouter();
    const modelSelectionPathname = router.pathname;
    const [menuHide, setMenuHide] = useState(false);

    const [modelSelecMenu, setModelSelecMenu] = useState(true)

    // menubar hide
    // useEffect(() => {
    //     if (modelSelectionPathname === '/own-online/model-selection' || modelSelectionPathname === '/own-online/product-details' || modelSelectionPathname === '/own-online/dealer' || modelSelectionPathname === '/own-online/finance/summary' || modelSelectionPathname === "/own-online/finance/application/details/exclusive-benefits" || modelSelectionPathname === "/own-online/finance/application/details/addons" || modelSelectionPathname === "/own-online/finance/application/details/accessories") {
    //         setMenuHide(false)
    //         setModelSelecMenu(true)
    //     } else {
    //         setMenuHide(true)
    //         setModelSelecMenu(false)
    //     }
    // }, [modelSelectionPathname])

    const [contentShow, setContentShow] = useState('');
    const [contentIdShow, setContentIdShow] = useState(0);
    const [isActive, setIsActive] = useState(false);

    // menu onClicks
    const megaMenuOnclick = (title, id) => {

        setContentShow(title)

        setContentIdShow(id)

        if (title) {
            setIsActive(true)
            if (title === contentShow) {
                setIsActive(!isActive)
            }
        } else {
            setIsActive(false)
        }

        // if (title === 'vehicles') {
        //     setIsVehiclesActive(!isvehiclesAtive)
        //     if (isbuyAtive === true) {
        //         setIsBuyActive(false)
        //     }
        //     // setMenuName('vehicles')
        //     // const meneusName = megaMenuBar.map((ele) => {
        //     //     if (ele.name === title) {
        //     //         return ele.menuList;
        //     //     }
        //     // })

        //     // // setMenuList(meneusName)

        //     // meneusName.forEach((ele) => {
        //     //     console.log(ele.name)
        //     // })
        // }

        // if (title === 'buy') {
        //     setIsBuyActive(!isbuyAtive)
        //     if (isvehiclesAtive === true) {
        //         setIsVehiclesActive(false)
        //     }
        //     // setMenuName('buy')
        //     // const meneusName = megaMenuBar.map((ele) => {
        //     //     if (ele.name === title) {
        //     //         return ele.menuList;
        //     //     }
        //     // })

        //     // setMenuList(meneusName)
        // }
    }

    const handleHome = () => {
        router.push('/')
    }

    const [ismenu, setIsMenu] = useState(1);

    const handleClick = (id) => {
        setIsMenu(id)
    }

    const darkModeImgLogo = '/logos.png';
    const lightModeImgLogo = '/logo2.png'

    return (
        <>
            <nav className={`w-full h-[67px] px-[15px] relative`}>
                <div className='flex justify-between items-center max-w-[1200px] mx-auto w-full h-full'>
                    {/* logo */}
                    <div className='h-max flex items-center gap-2'>
                        {/* logo */}
                        <div className='h-full w-[150px]'>
                            <Link onClick={() => handleHome()} href='/' className='w-full h-[80px]'>
                                <Image width={200} height={40} className="" src={`${theme === "light" ? lightModeImgLogo && lightModeImgLogo : darkModeImgLogo && darkModeImgLogo}`} alt='light-logo-images' />
                            </Link>
                        </div>
                    </div>
                    {/* middle menu and search and user profile */}
                    <div className={`${modelSelectionPathname ? menuHide === false ? 'hidden' : 'block' : ''} xl:w-[80%] w-[85%]`}>
                        <div className='flex items-center justify-between'>
                            {/* middle menu list */}
                            <div className='flex items-center relative'>
                                <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                                    {
                                        megaMenuBar.map((ele) => {
                                            const { id, name } = ele;
                                            return (
                                                <li ref={closeMegaMenu} key={id} className={`${name} select-none px-3 py-2 flex items-center xl:text-[18px] text-[16px] font-black capitalize ml-2 relative`}>
                                                    <span onClick={() => { megaMenuOnclick(name, id) }} className="ml-2 cursor-pointer">{name}</span>
                                                    {
                                                        contentIdShow === id && isActive &&
                                                        <div onMouseLeave={() => setIsActive(false)} key={id} className={` ${ele.menuList.length !== 0 ? `${ele.name === 'buy' ? 'w-[1300%]' : 'w-[970%]'} border-[1px] border-[#3C3C3C] absolute left-0 top-[55px] flex divide-black divide-x-[1px] h-max ${theme === "light" ? 'bg-[#F4F4F4]' : 'bg-[#3C3C3C]'} z-50 shadow-lg` : 'hidden'}`}>
                                                            <div className="w-[25%] h-full border-black border-r-0">
                                                                <ul className='w-full h-full'>
                                                                    {
                                                                        ele.menuList.map((menu) => {
                                                                            const { id, name } = menu

                                                                            return (
                                                                                <li key={id} onClick={() => handleClick(id)} className={`cursor-pointer ${ismenu === id && "bg-[#CE0E2D] text-white"} py-[16px] pl-[18px] pr-[15px] font-bold dark:text-white text-[16px] border border-black border-l-0 border-t-0 border-r-0 border-b-1 flex items-center justify-between`}>
                                                                                    {name}
                                                                                    <FaChevronRight className={`${ismenu === id && 'rotate-180 transition-all'}`} size={18} />
                                                                                </li>
                                                                            )
                                                                        })
                                                                    }
                                                                </ul>
                                                            </div>
                                                            {/* contents */}
                                                            <div className="w-[75%] h-full p-[20px]">
                                                                <ul id={contentShow === 'vehicles' ? 'carsMenuList' : undefined} className={`${ele.name === 'buy' ? 'grid grid-cols-3' : 'grid grid-cols-4'}`}>
                                                                    {
                                                                        ele.contentList.map((el) => {
                                                                            const { id, title, desc, links, imgSrc } = el
                                                                            if (imgSrc) {
                                                                                return (
                                                                                    <Link onClick={() => setIsActive(false)} href={links} key={id} className="list h-max flex items-center flex-col gap-[5px] px-[10px] mb-[30px] dark:text-white">
                                                                                        <Image height={91} width={168} src={imgSrc && imgSrc} alt="img" className='transition-all' />
                                                                                        <label className='transition-all'>{title}</label>
                                                                                    </Link>
                                                                                )
                                                                            } else {

                                                                                return (
                                                                                    <Link onClick={() => setIsActive(false)} href={links} key={id} className="list h-max flex flex-col gap-[8px] px-[10px] mb-[30px] dark:text-white">
                                                                                        <h3 className='font-black text-[16px] '>{title}</h3>
                                                                                        <p className='text-[14px] font-[400]'>{desc}</p>
                                                                                    </Link>
                                                                                )
                                                                            }
                                                                        })
                                                                    }
                                                                </ul>

                                                                {
                                                                    contentShow === 'vehicles' &&
                                                                    <div className='w-full h-full mt-[22px]'>
                                                                        <div className='w-full flex items-center justify-center'>
                                                                            <button type='button' className={`h-[44px] p-[8px_20px_9px] font-black text-white capitalize rounded-[10px] ${theme === "dark" ? 'border-white bg-[#191919] hover:bg-[#ce0e2d] hover:border-[#ce0e2d]' : 'border-[#ce0e2d] bg-[#ce0e2d] hover:border-[#ce0e2d]'} border-2`}>see all vehicles</button>
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    }
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            {/* search and user profile */}
                            <div className='flex items-center gap-4'>
                                <div className='px-[15px]'>
                                    <h1 className={`${theme === "dark" ? 'text-white' : 'text-black'}`}>Text Drive</h1>
                                </div>
                                <div className='px-[15px]'>
                                    <h1 className=''>Locate Us</h1>
                                </div>
                                <div>
                                    <BsSearch className='' size={20} />
                                </div>
                                <div>
                                    <AiOutlineUser className='' size={22} />
                                </div>
                            </div>

                            {
                                modelSelecMenu && menuHide &&
                                <div onClick={() => setMenuHide(false)} className='w-max cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                        <path d="M1 1.5L15 15.5" stroke={`${theme === "dark" ? 'white' : '#0B0B0C'}`} strokeWidth="2" strokeLinecap="round" />
                                        <path d="M15 1.5L1 15.5" stroke={`${theme === "dark" ? 'white' : '#0B0B0C'}`} strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </div>
                            }
                        </div>
                    </div>

                    {/* tab and mobile view hamburger */}
                    {
                        modelSelectionPathname && menuHide === false &&
                        <div className={`${modelSelectionPathname ? 'block' : 'lg:hidden block'}`}>
                            <div className='flex gap-[26px] items-center'>
                                {/* model - selections */}
                                {
                                    modelSelectionPathname &&
                                    <div className='w-max'>
                                        <h2 className={`${theme === "light" ? 'text-black' : 'text-white'} text-[12px]`}>Buy Online</h2>
                                    </div>
                                }
                                <div onClick={() => modelSelectionPathname ? setMenuHide(true) : setMobileView(!mobileView)} className='flex flex-col gap-1 w-[18px] h-[12px] cursor-pointer'>
                                    <span className={`w-full h-full ${theme === "light" ? 'bg-black' : 'bg-white'} rounded-md`}></span>
                                    <span className={`w-full h-full ${theme === "light" ? 'bg-black' : 'bg-white'} rounded-md`}></span>
                                    <span className={`w-full h-full ${theme === "light" ? 'bg-black' : 'bg-white'} rounded-md`}></span>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                {/* =============================================== */}
                {/* ================== Dropdown =================== */}
                {/* {
                    isActive &&
                    <DropDownList uniqueId={contentIdShow} items={megaMenuBar} isShow={contentShow} />
                } */}
            </nav>
        </>
    )
}

export default DeskTopNavbar