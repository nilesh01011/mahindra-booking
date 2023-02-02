import React, { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { cityRegisters, stateRegisters } from '../api/cityRegister'
import Buttons from './Buttons'

function SelectStateCity({ theme }) {
    const [showroomPlace, setShowroomPlace] = useState(false)

    // ==== state ====
    const [searchTextStateValue, setSearchTextStateValue] = useState([])
    const [openStateList, setOpenStateList] = useState(false)

    // value get
    const [searchStateList, setSearchStateList] = useState('')

    const handleSearchStateValue = (e) => {
        const searchText = e.target.value;
        setSearchStateList(searchText)
        const searctResult = cityRegisters.filter((ele) => {
            return ele.state.toLowerCase().includes(searchText)
        })
        if (searchText === "") {
            setSearchTextStateValue([])
            setOpenStateList(false);
        } else {
            setSearchTextStateValue(searctResult)
            setOpenStateList(true);
        }
    }

    // ==== city ====
    const [searchTextCityValue, setSearchTextCityValue] = useState([])
    const [openCityList, setOpenCityList] = useState(false)
    // value get
    const [searchCityList, setSearchCityList] = useState('')

    const handleSearchCityValue = (e) => {
        const searchText = e.target.value;
        setSearchCityList(searchText)
        const searctResult = stateRegisters.filter((ele) => {
            return ele.state.toLowerCase().includes(searchText)
        })
        if (searchText === "") {
            setSearchTextCityValue([])
            setOpenCityList(false)
        } else {
            setSearchTextCityValue(searctResult)
            setOpenCityList(true)
        }
    }

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
            <div className=' w-full h-[20px]'>
                <h2 className={`text-[12px] flex items-baseline ${theme === "dark" ? 'text-white' : 'text-black'}`}>
                    *Ex-showroom price:
                    <div onClick={() => handleClicks()} className='flex ml-1 items-center gap-[0.3rem] cursor-pointer'>
                        <p className='font-bold'>Pune</p>
                        <FiEdit className={`${theme === "dark" ? 'text-white' : 'text-black'}`} size={12} />
                    </div>
                </h2>
            </div>

            {/* popup box */}
            {/* ex-showroom placement shows */}

            {
                showroomPlace &&
                <div className={`w-full h-full fixed top-0 left-0 bottom-0 right-0 z-50`}>
                    {/* overlays */}
                    <div onClick={() => handleClose()} className={`z-50 w-full h-full fixed left-0 right-0 top-0 bottom-0 bg-[#0B0B0C] opacity-[0.9]`}></div>
                    {/* select place menu content */}
                    <div className={`${isOpen ? 'opacity-1' : 'opacity-0'} transition-opacity w-full h-full flex items-center justify-center`}>
                        <div className={`sm:w-[393px] w-[340px] h-[262px] rounded-[20px] p-[20px_40px] z-[100] border-[1px] border-white relative ${theme === "dark" ? ' bg-[#212121]' : 'bg-white'}`}>
                            <div className='relative'>
                                <h1 className={`${theme === "dark" ? 'text-white' : 'text-black'} font-black text-[24px] text-center`}>City of Registration</h1>
                                {/* cancle button */}
                                <div onClick={() => handleClose()} className={`font-bold absolute top-1 -right-[15px] cursor-pointer`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                        <path d="M1 1.5L15 15.5" stroke={`${theme === "dark" ? 'white' : '#0B0B0C'}`} strokeWidth="2" strokeLinecap="round" />
                                        <path d="M15 1.5L1 15.5" stroke={`${theme === "dark" ? 'white' : '#0B0B0C'}`} strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </div>

                            {/* input body */}
                            <div className='w-full h-max mt-[20px]'>
                                <form>
                                    {/* <SearchText searchStateList={searchStateList} handleSearchValue={handleSearchValue} searchTextValue={searchTextValue} setSearchTextValue={setSearchTextValue} placeholders="SELECT STATE" /> */}
                                    <div className='w-full h-[45px] mb-[15px] relative'>
                                        <input className='w-full h-full p-[10px_15px] uppercase rounded-[5px] text-[14px] bg-[#F4F4F4]' onChange={handleSearchStateValue} type="text" value={searchStateList} placeholder="SELECT STATE" />
                                        {
                                            openStateList === true && searchTextStateValue.length != 0 &&
                                            <div className={`absolute top-[115%] left-0 right-0 w-full max-h-[200px] border-[1px] ${theme === "dark" ? 'bg-[#212121] border-white' : 'bg-[#f4f4f4] border-black'} z-50 rounded-[5px] overflow-y-auto overflow-x-hidden`}>
                                                <ul className={`p-[10px_15px] border-[1px] ${theme === 'dark' ? 'bg-[#212121] border-[#b2b2b2]' : 'bg-white border-[#DEDEDE]'}`}>
                                                    {
                                                        searchTextStateValue.map((ele) => {
                                                            const { id, state } = ele
                                                            return (
                                                                <li onMouseOver={() => setSearchStateList(state)} onClick={() => setOpenStateList(false)} key={id} className={`cursor-pointer text-[14px] ${theme === "dark" ? 'text-white' : 'text-black'} p-[3px] capitalize`}>{state}</li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        }
                                    </div>
                                    {/* <SearchText placeholders="SELECT CITY" /> */}
                                    <div className='w-full h-[45px] mb-[15px] relative'>
                                        <input className='w-full h-full p-[10px_15px] uppercase rounded-[5px] text-[14px] bg-[#F4F4F4]' onChange={handleSearchCityValue} type="text" value={searchCityList} placeholder="SELECT CITY" />
                                        {
                                            openCityList === true && searchTextCityValue.length != 0 &&
                                            <div className={`absolute top-[115%] left-0 right-0 w-full max-h-[200px] border-[1px] ${theme === "dark" ? 'bg-[#212121] border-white' : 'bg-[#f4f4f4] border-black'} z-50 rounded-[5px] overflow-y-auto overflow-x-hidden`}>
                                                <ul className={`p-[10px_15px] border-[1px] ${theme === 'dark' ? 'bg-[#212121] border-[#b2b2b2]' : 'bg-white border-[#DEDEDE]'}`}>
                                                    {
                                                        searchTextCityValue.map((ele) => {
                                                            const { id, state } = ele
                                                            return (
                                                                <li onMouseOver={() => setSearchCityList(state)} onClick={(e) => setOpenCityList(false)} key={id} className={`cursor-pointer text-[14px] ${theme === "dark" ? 'text-white' : 'text-black'} p-[3px] capitalize`}>{state}</li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        }
                                    </div>
                                    <div className='w-full flex items-center justify-center h-[44px]'>
                                        <Buttons type="button" title="confirm" outline={true} theme={theme} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default SelectStateCity