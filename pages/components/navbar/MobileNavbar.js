import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { BsChevronRight } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci'
import { megaMenuBar } from '../../api/MenuBar';
import { AiOutlineUser } from 'react-icons/ai'
import Image from 'next/image';

function MobileNavbar({ theme }) {
    const [isActive, setIsActive] = useState(false);
    const [searchValue, setSearchValue] = useState('')

    const handleSearch = (e) => {
        setSearchValue(e.target.value)
    }

    const [contentShow, setContentShow] = useState('');
    const [isOpenLeft, setIsOpenLeft] = useState(false)
    const [showContent, setShowContent] = useState([])

    // length checks

    const megaMenuBarOpen = (title) => {

        const megaMenu = megaMenuBar.map((ele) => {
            if (ele.name === title) {
                if (ele.contentList.length !== 0) {
                    setIsOpenLeft(true)
                    setContentShow(title)

                    // setShowContent([ele]);

                } else {
                    setIsOpenLeft(false)
                    setContentShow('')
                }
            }
        })

        return megaMenu
    }

    const handleBackMenu = () => {
        setIsOpenLeft(!isOpenLeft);
        setShowContent([]);
        setContentShow('')

        // setIsActive(true)
    }

    const [collapseOpen, setCollapseOpen] = useState(false)

    // currents items clicks
    const [currentItems, setCurrentItems] = useState(0)

    const handleCloseAll = () => {
        setIsActive(false)
        setIsOpenLeft(false)
        setContentShow('')
    }

    const darkModeImgLogo = '/logo.png';
    const lightModeImgLogo = '/logo2.png';

    const [currentItemsCollapse, setCurrentItemsCollapse] = useState('');

    // handleButtonActive buttons

    // const handleButtonActive = useRef()

    const handleCurrentItemsCollapse = (el) => {
        setCollapseOpen(!collapseOpen)
        setCurrentItems(el.id);

        setCurrentItemsCollapse(el.name)
    }


    return (
        <>
            <div className={`${!isActive ? 'h-[67px]' : 'h-full fixed top-0'} ${theme === "dark" ? 'bg-[#242424] text-white' : 'bg-white text-black'} w-full`}>
                <nav className={`w-full h-[67px] px-[15px]`}>
                    <div className='flex justify-between items-center max-w-[1200px] mx-auto w-full h-full'>
                        {/* logo */}
                        <div className='w-[102px] h-[15px] flex items-center gap-2'>
                            <Link className="h-[15px]" href='/'>
                                <Image width={102} height={11} className="w-[102px] h-[11px] object-contain" src={`${theme === "dark" ? darkModeImgLogo && darkModeImgLogo : lightModeImgLogo && lightModeImgLogo}`} alt='logo-images' priority={11} />
                            </Link>
                        </div>
                        {/* humburger */}
                        <div className='flex gap-[26px] items-center'>
                            {/* model - selections */}
                            <div className='w-max'>
                                <h2 className={`${theme === "dark" ? 'text-white' : 'text-black'} text-[12px]`}>Buy Online</h2>
                            </div>
                            <div onClick={() => setIsActive(!isActive)} className='flex flex-col gap-1 w-[18px] h-[12px] cursor-pointer'>
                                <span className={`w-full h-full ${theme === "dark" ? 'bg-white' : 'bg-black'} rounded-md`}></span>
                                <span className={`w-full h-full ${theme === "dark" ? 'bg-white' : 'bg-black'} rounded-md`}></span>
                                <span className={`w-full h-full ${theme === "dark" ? 'bg-white' : 'bg-black'} rounded-md`}></span>
                            </div>
                        </div>
                    </div>
                </nav>
                {/* mobiles navbars */}
                {/* fixed top-[67px] */}

                {
                    isActive === true &&
                    <div className={`h-full w-full relative top-0 left-0 right-0 ${theme === "dark" ? 'bg-[#242424]' : 'bg-white'} px-[15px] z-[1000]`}>
                        <div className='w-full flex flex-col'>
                            {/* search */}
                            <div className='h-[40px] w-full rounded-[10px] relative mb-[1rem]'>
                                <input type="text" onChange={handleSearch} value={searchValue} placeholder="Search" className='h-full w-full px-[20px] rounded-[10px] sm:text-[18px] text-[16px] font-normal placeholder:text-[20px] placeholder:font-[300] placeholder:text-black' style={{ border: '1px solid #8E8585' }} />
                                <button type='button' className='absolute top-0 right-0 bottom-0 w-[45px] h-full bg-[#CE0E2D] rounded-[0_10px_10px_0] p-[6px] flex items-center justify-center'>
                                    <CiSearch className='text-white' size={24} />
                                </button>
                            </div>

                            {/* middle menubars */}
                            <div className='w-full'>
                                <ul className='w-full flex flex-col divide-y-[1px] divide-[#777272]'>
                                    {
                                        megaMenuBar.map((ele) => {
                                            const { name, id, contentList } = ele
                                            return (
                                                <li key={id} className="w-full h-full">
                                                    <div key={name} onClick={() => { megaMenuBarOpen(name) }} className="w-full flex justify-between items-center py-[9px] sm:text-[18px] text-[16px] font-black cursor-pointer capitalize">
                                                        {name}
                                                        {
                                                            contentList.length !== 0 &&
                                                            <div className='h-full pr-[13px]'>
                                                                {/* ${ele.name === contentShow ? 'rotate-90' : 'rotate-0'} */}
                                                                <BsChevronRight size={18} className={`text-white transition-all`} />
                                                            </div>
                                                        }
                                                    </div>
                                                    {/* {
                                                        showContent && showContent?.map((el) => {
                                                            const { name, id, contentList, menuList } = el
                                                            return (
                                                                <div key={id} className='w-full h-full'>
                                                                    {
                                                                        menuList.map((list) => {
                                                                            <button type='button' className={`w-full ${currentItems === id ? 'h-max' : 'h-[38px]'} bg-[#3c3c3c] rounded-[6px]`}>
                                                                                <div onClick={() => { setCollapseOpen(!collapseOpen), setCurrentItems(id) }} className={`w-full flex items-center justify-between h-full dark:bg-[#3C3C3C] bg-[#F4F4F4] p-[10px_25px]`}>
                                                                                    <span className='text-white text-[14px]'>{list.name}</span>
                                                                                    <BsChevronRight size={15} className={`text-white rotate-90`} />
                                                                                </div>
                                                                            </button>
                                                                        })
                                                                    }
                                                                </div>
                                                            )
                                                        })
                                                    } */}
                                                </li>
                                            )
                                        })
                                    }

                                    {/* user profiles */}
                                    <div className='w-full'>
                                        <div className='flex gap-[10px] h-[55px] items-center'>
                                            <AiOutlineUser size={20} className="text-[#8E8585]" />
                                            <span className='dark:text-white'>Account</span>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                }
                {/* megaMenuBar opens */}
                {/* */}
                {
                    isOpenLeft &&
                    <div id="overFlowNone" className={`w-full h-full fixed top-[67px] left-0 overflow-scroll transition-left ${theme === "dark" ? 'bg-[#242424] text-white' : 'bg-white text-black'} px-[15px] z-[1000]`}>
                        {/* backs buttons */}
                        <div className='w-full border-b-[1px] border-[#777272] mb-[10px]'>
                            <button onClick={() => handleBackMenu()} type='button' className='w-max flex items-center gap-[6px] pb-[10px]'>
                                <BsChevronRight size={15} className="rotate-180" />
                                Back to Menu
                            </button>
                        </div>

                        {/* contents */}

                        {
                            megaMenuBar.map((ele) => {
                                if (ele.name === contentShow) {
                                    const { name, id, contentList } = ele

                                    {/* console.log(ele) */ }
                                    return (
                                        <div key={id} className="w-full mb-[50px]">
                                            {/* title */}
                                            <div className='w-full py-[10px]'>
                                                <h6 className='font-black text-[20px] capitalize'>{name}</h6>
                                            </div>

                                            {/* tabs collapse */}

                                            <div className='w-full flex flex-col items-start gap-[8px] mb-[100px]'>
                                                {
                                                    ele.menuList.map((el) => {
                                                        const { id, name, carsList } = el

                                                        return (
                                                            <>
                                                                <button type='button' key={id} className={`w-full ${currentItems === id ? 'h-full' : 'h-[38px]'} ${theme === "dark" ? 'bg-[#3C3C3C]' : 'bg-[#F4F4F4]'} rounded-[6px]`}>
                                                                    <div key={currentItems} onClick={() => handleCurrentItemsCollapse(el)} className={`w-full flex items-center justify-between h-full ${theme === "dark" ? `${currentItems === id && collapseOpen ? 'bg-[#e51636]' : 'bg-[#3C3C3C]'}` : `${currentItems === id && collapseOpen ? 'bg-[#e51636]' : 'bg-[#F4F4F4]'}`} p-[10px_25px]`}>
                                                                        <span className={`text-[15px] ${collapseOpen && currentItems === id ? 'text-white' : ''}`}>{name}</span>
                                                                        {/* icons */}
                                                                        <BsChevronRight size={15} className={`transition-all ${collapseOpen && currentItems === id ? 'rotate-90 text-white' : 'rotate-[270deg]'}`} />
                                                                    </div>

                                                                    {/* contents */}
                                                                    {
                                                                        collapseOpen && currentItems && currentItemsCollapse === name &&
                                                                        <div key={name} className='w-full h-max'>

                                                                            <ul id='mobileMenuBarLinks' className='w-full h-full grid grid-cols-2 gap-[10px] pb-[10px]'>
                                                                                {
                                                                                    contentList.map((items) => {
                                                                                        const { id, imgSrc, title, links, desc } = items

                                                                                        if (imgSrc) {
                                                                                            return (
                                                                                                <Link key={id} onClick={() => handleCloseAll()} href={links} className="flex flex-col gap-[6px] sm:h-[150px] h-[106px] p-[10px]">
                                                                                                    {/* images */}
                                                                                                    <div className='h-[80%]'>
                                                                                                        <Image src={imgSrc} alt={title} width={289} height={170} className="w-full h-full object-contain" />
                                                                                                    </div>
                                                                                                    {/* titles */}
                                                                                                    <div className='titles h-[20%] font-bold'>
                                                                                                        {title}
                                                                                                    </div>
                                                                                                </Link>
                                                                                            )
                                                                                        } else {
                                                                                            return (
                                                                                                <Link key={id} onClick={() => handleCloseAll()} href={links} className="flex flex-col gap-[6px] h-max p-[10px]">
                                                                                                    <h3 className='font-black'>{title}</h3>
                                                                                                    <p className='text-[14px]'>{desc}</p>
                                                                                                </Link>
                                                                                            )
                                                                                        }
                                                                                    })
                                                                                }
                                                                            </ul>

                                                                        </div>
                                                                    }
                                                                </button>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                }
            </div>
        </>
    )
}

export default MobileNavbar