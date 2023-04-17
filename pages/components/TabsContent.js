import React, { useEffect, useState } from 'react'
import { megaMenuBar } from '../api/MenuBar';
import { TabsList } from '../api/CardList';
import Cards from './Cards';

function TabsContent({ theme }) {

    const [toggleState, setToggleState] = useState(1);

    const [carsListBody, setCarsListBody] = useState([])

    const toggleTabs = (e) => {
        setToggleState(e)
        setCarsListBody([])
    }

    useEffect(() => {
        TabsList.map((el) => {
            toggleState === el.id && el.carsList.map((ele) => {
                setCarsListBody(el.carsList)
            })
        })

    }, [toggleState, carsListBody]);


    return (
        <div className='dark:text-white w-full h-full'>
            <div className='w-full h-max flex items-center justify-center'>
                {/* bg-[#4A1C24] */}
                {
                    TabsList.map((ele) => {
                        const { id, title } = ele
                        return (
                            <button key={id} type='button' onClick={() => toggleTabs(id)} className={`relative ${toggleState === id ? 'font-bold' : 'font-[400]'} dark:text-white w-[107px] ${ele.length}`}>
                                {title}
                                <span className={`absolute bottom-[-5px] left-0 w-full h-[2px] ${toggleState === id ? 'bg-[#FF3E5B]' : 'bg-[#FF3E5B] opacity-[20%]'}`}></span>
                            </button>
                        )
                    })
                }
            </div>
            {/* content body */}
            <div className='w-full h-full mb-[30px]'>
                {/* title */}
                <h1 className={`text-[26px] font-bold my-[20px] ${theme === "light" ? 'text-black' : 'text-white'}`}>Select Vehicle</h1>
                <div className='w-full h-full grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[20px] items-center'>
                    {
                        carsListBody.map((ele) => {
                            return <Cards key={ele.id} {...ele} allDetails={ele} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default TabsContent