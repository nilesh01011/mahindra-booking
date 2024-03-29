import React, { useEffect, useState } from 'react'
import DeskTopNavbar from './DeskTopNavbar'
import MobileNavbar from './MobileNavbar'

function Navbar() {
    // get theme
    const [theme, setTheme] = useState('');

    useEffect(() => {
        const themes = localStorage.getItem('theme');

        if (themes === "dark") {
            setTheme('dark');
            localStorage.setItem('theme', "dark");
        }

        if (themes === "light") {
            setTheme('light');
            localStorage.setItem('theme', "light");
        }
    }, [theme])

    return (
        <>
            <div id='navbar' className={`lg:block hidden sticky top-0 z-30 ${theme === "light" ? 'bg-white text-black' : 'bg-[#242424] text-white'}`}>
                <DeskTopNavbar theme={theme} />
            </div>
            <div id='navbar' className={`lg:hidden block sticky top-0 z-30 ${theme === "light" ? 'bg-white text-black' : 'bg-[#242424] text-white'}`}>
                <MobileNavbar theme={theme} />
            </div>
        </>
    )
}

export default Navbar