import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

function Buttons({ title, outline, links, cardsItems, setWidth, theme, disabled, type }) {
    const urlLinks = links ? links : '';

    const router = useRouter();

    const handleClick = () => {
        if (urlLinks) {
            router.push(urlLinks)

            localStorage.setItem("cardsDetails", JSON.stringify(cardsItems));
        }
    }

    const widthSet = `${setWidth + 'px'}`;

    return (
        <button disabled={disabled ? true : null} onClick={() => handleClick()} type={type} className={`sm:text-[16px] text-[15px] relative z-[5] capitalize ${disabled ? 'opacity-[0.6]' : 'opacity-1'} ${setWidth ? `` : 'xl:w-[150px] md:w-[150px] w-[120px]'} h-full before:content-[""] before:absolute before:left-0 before:right-0 before:bottom-0 before:top-0 ${setWidth ? `before:sm:w-auto before:w-[126px]` : 'before:md:w-[144px] before:w-[122px]'}
         before:h-[44px] before:border-[1px] ${outline === false ? ' before:border-[#ff3e5b] before:bg-[#ff3e5b] text-white' : `${theme === "light" ? 'before:border-black text-black hover:text-white' : ' before:border-white text-white'} hover:before:bg-[#ff3e5b] hover:before:border-[#ff3e5b]`} before:z-[-1] after:content-[""] after:absolute ${setWidth ? `after:md:-right-[10px] after:-right-[4px]` : 'after:md:right-[-3px] after:right-[-10px]'} after:bottom-0 after:top-0 after:bg-[#ff3e5b] after:w-[2px] after:h-full font-bold`}
        >
            {title}
            <style jsx>
                {`
                button::after,
                button:before {
                    transform:skew(-13deg);
                }

                button {
                    width : ${setWidth ? widthSet && widthSet : ''};
                }

                @media screen and (max-width: 756px) {
                    button {
                        width : ${setWidth ? widthSet && '136px' : ''};
                    } 
                }
            `}
            </style>
        </button>
    )
}

export default Buttons