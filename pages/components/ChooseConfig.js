import React, { useEffect, useRef, useState } from 'react'

let useClickOutSide = (handler) => {
    let domNode = useRef();

    useEffect(() => {
        const handlerEvent = (e) => {
            if (!domNode.current.contains(e.target)) {
                handler();
            }
        }

        document.addEventListener("mousedown", handlerEvent);

        return () => {
            document.removeEventListener("mousedown", handlerEvent)
        }
    }, [handler]);

    return domNode
}

function ChooseConfig({ title, contents, theme }) {
    const [isActive, setIsActive] = useState(1);
    const [contentOne, setContentOne] = useState("");
    const [contentTwo, setContentTwo] = useState("");

    // seater more than 3
    const [seater, setSeater] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

    const [selected, setSelected] = useState('');

    useEffect(() => {
        // fuel
        const contentsOne = contents?.map((ele) => {

            try {
                if (ele.id === 1) {
                    setContentOne(ele.types)
                    // console.log(ele.types)
                }
            } catch (error) {
                console.log(error)
            }
        });

        // transmission
        const contentsTwo = contents?.map((ele) => {

            try {
                if (ele.id === 2) {
                    setContentTwo(ele.types)
                    // console.log(ele.types)
                }
            } catch (error) {
                console.log(error)
            }
        });

        // seaters
        const carSeaters = contents?.map((ele) => {
            setSeater(contents);
        });

    }, [contents]);

    let domNode = useClickOutSide(() => {
        setIsOpen(false)
    })

    const selectBoxText = (ele) => {
        setSelected(ele.target.innerHTML);
        setIsOpen(!isOpen);
    }

    return (
        <>
            <div className={`w-full h-[120px] rounded-[10px] ${theme === "dark" ? 'bg-[#242424]' : 'bg-white'} p-[8px] shadow-md`}>
                {/* title */}
                <div className='w-full border-b-[1px] border-[#8E8585] pb-[4px] text-center'>
                    <h4 className={`${theme === "dark" ? 'text-white' : 'text-black'} font-bold capitalize sm:text-[16px] text-[14px]`}>{title}</h4>
                </div>
                {/* buttons */}
                <div ref={domNode} className='w-full h-[72px] pt-[8px] flex gap-[8px] flex-col items-center justify-center'>
                    {
                        contents?.length <= 2 ? (
                            <>
                                <button onClick={() => setIsActive(1)} type='button' className={`sm:text-[16px] text-[12px] capitalize w-full h-[28px] rounded-[16px] ${isActive === 1 ? `text-[#0B0B0C] ${theme === "dark" ? 'bg-white' : 'bg-[#DEDEDE]'}` : `border-[1px] ${theme === "dark" ? 'border-white text-white' : 'border-[#DEDEDE] text-[#0B0B0C]'}`}`}>{contentOne}</button>
                                <button onClick={() => setIsActive(2)} type='button' className={`sm:text-[16px] text-[12px] capitalize w-full h-[28px] rounded-[16px] ${isActive === 2 ? `text-[#0B0B0C] ${theme === "dark" ? 'bg-white' : 'bg-[#DEDEDE]'}` : `border-[1px] ${theme === "dark" ? 'border-white text-white' : 'border-[#DEDEDE] text-[#0B0B0C]'}`}`}>
                                    {contentTwo}
                                </button>
                            </>
                        )
                            : (
                                <>
                                    <button type='button' className={`relative sm:text-[16px] text-[12px] capitalize w-full h-[28px] rounded-[16px] ${isActive === 1 ? `text-[#0B0B0C] ${theme === "dark" ? 'bg-white' : 'bg-[#DEDEDE]'}` : `border-[1px] ${theme === "dark" ? 'border-white text-white' : 'border-[#DEDEDE] text-[#0B0B0C]'}`}`}>
                                        <div onClick={() => setIsOpen(!isOpen)} className='w-full h-full capitalize rounded-[16px] overflow-hidden'>
                                            {
                                                seater?.map((ele) => {
                                                    const { id } = ele
                                                    return (
                                                        <p key={id} className="w-full h-full flex items-center justify-center relative sm:gap-0 gap-[6px]">
                                                            <span>{selected !== "" ? selected : id === 1 ? ele.types : ''}</span>
                                                            {/* icons */}
                                                            <span className='sm:absolute sm:right-[10%] sm:top-[36%]'>
                                                                <svg className={`${isOpen === true ? '' : 'rotate-180'} transition-all`} xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
                                                                    <path d="M12.25 7L7 1.75L1.75 7" stroke="#242424" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </span>
                                                        </p>
                                                    )
                                                })
                                            }
                                        </div>

                                        {
                                            isOpen && (
                                                <ul className={`h-max z-20 ${theme === 'dark' ? 'bg-[#F4F4F4]' : 'bg-white'} ${isOpen ? 'opacity-1 duration-[1500ms]' : 'opacity-0 duration-[1500ms]'} relative w-full left-0 right-0 -bottom-[5px] rounded-[10px] transition-all shadow-md`}>
                                                    {
                                                        seater?.map((ele) => {
                                                            const lastArray = seater?.length - 1;

                                                            console.log(ele.id === 1)

                                                            return (
                                                                <li key={ele.id} onClick={selectBoxText} className={` ${ele.id === 1 && 'rounded-[10px_10px_0_0]'}  ${theme === 'dark' ? `hover:bg-[#DEDEDE]` : 'hover:bg-[#DEDEDE] text-[#0B0B0C]'} box-border px-4 pt-[4px] pb-[6px] cursor-pointer ${lastArray + 1 === ele.id && 'rounded-[0_0_10px_10px]'}`}>
                                                                    {
                                                                        ele.types
                                                                    }
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            )
                                        }
                                    </button>
                                </>
                            )
                    }

                </div>
            </div>
        </>
    )
}

export default ChooseConfig