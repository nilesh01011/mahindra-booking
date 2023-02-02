import React, { useEffect, useState } from 'react'
import DeskTopNavbar from './DeskTopNavbar'
import MobileNavbar from './MobileNavbar'

function Navbar({ theme }) {

    return (
        <>
            <div id='navbar' className={`lg:block hidden sticky top-0 z-30 ${theme === "dark" ? 'bg-[#242424] text-white' : 'bg-white text-black'}`}>
                <DeskTopNavbar theme={theme} />
            </div>
            <div id='navbar' className={`lg:hidden block sticky top-0 z-30 ${theme === "dark" ? 'bg-[#242424] text-white' : 'bg-white text-black'}`}>
                <MobileNavbar theme={theme} />
            </div>
        </>
    )
}

export default Navbar