import React, { useEffect } from 'react'
import { steppersList } from '../api/SteppersDate'

function Steppers({ Steps, theme }) {

    // useEffect(() => {
    //     const previousActive = document.querySelector("#steps");

    //     console.log(previousActive);
    // })

    return (
        <ul className='w-[320px] h-full flex items-center justify-between relative '>
            {/* before:content-[""] before:absolute before:-bottom-[15%] before:left-[5%] before:right-[5%] before:w-[90%] before:h-[1px] before:bg-white */}

            <li className={`absolute left-[8%] -bottom-[11px] w-[85%] h-[1px] bg-[#8E8585] -z-[1]`}></li>

            {
                steppersList.map((ele) => {
                    const { id, title, active } = ele;
                    const activeSet = Steps === id;
                    const previousActive = Steps - id;
                    const checkValue = previousActive === 1 || previousActive === 2
                    const lastValues = steppersList.slice(-1)[0]

                    return (
                        <li key={id} className="relative flex items-center justify-center">
                            <span className={`text-[14px] ${activeSet === true ? 'text-[#FF3E5B]' : `${checkValue ? `${theme === "dark" ? 'text-white' : 'text-black'}` : 'text-[#8E8585]'}`} uppercase w-max`}>
                                {title}
                            </span>
                            {/* ${lastValues.id === Steps ? '-bottom-[26px]' : '-bottom-[23px]'} */}
                            <div className={`absolute -bottom-[22.5px]`}>
                                {
                                    checkValue ? (
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 18" fill="none">
                                                <path d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z" fill="#FF3E5B" />
                                                <path d="M6.59252 12.97C6.377 12.9698 6.17015 12.8851 6.01652 12.734L3.33352 10.051C3.25387 9.97623 3.19006 9.88626 3.14587 9.78639C3.10168 9.68652 3.07801 9.57878 3.07628 9.46959C3.07454 9.36039 3.09476 9.25196 3.13575 9.15073C3.17674 9.0495 3.23766 8.95755 3.31488 8.88032C3.3921 8.8031 3.48406 8.74218 3.58529 8.70119C3.68651 8.66021 3.79495 8.63998 3.90414 8.64172C4.01334 8.64346 4.12108 8.66712 4.22095 8.71131C4.32082 8.7555 4.41079 8.81932 4.48552 8.89896L6.57952 10.993L12.8495 4.80496C12.9248 4.72877 13.0145 4.66828 13.1134 4.62699C13.2123 4.58571 13.3184 4.56445 13.4255 4.56445C13.5327 4.56445 13.6387 4.58571 13.7376 4.62699C13.8365 4.66828 13.9262 4.72877 14.0015 4.80496C14.1525 4.95867 14.2371 5.16551 14.2371 5.38096C14.2371 5.59641 14.1525 5.80325 14.0015 5.95696L7.15552 12.721C7.0837 12.7988 6.99667 12.861 6.89984 12.9038C6.803 12.9467 6.6984 12.9692 6.59252 12.97Z" fill="white" />
                                            </svg>
                                        </span>
                                    ) : (
                                        activeSet === true ? (
                                            <span className={`w-[19px] h-[19px] rounded-full bg-[#FF3E5B] relative -bottom-[2px] flex items-center justify-center`}>
                                                <span className="block w-[8px] h-[8px] rounded-full bg-white animate-pulse"></span>
                                            </span>
                                        ) : (
                                            <span className={`block w-[16px] h-[16px] rounded-full bg-[#8E8585]`}></span>
                                        )
                                    )
                                }
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default Steppers