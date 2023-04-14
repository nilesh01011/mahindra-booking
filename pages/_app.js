import '../styles/globals.css'
import { Lato } from '@next/font/google'
import Navbar from './components/navbar/Navbar'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900']
})

export default function App({ Component, pageProps }) {

  // get theme
  const [theme, setTheme] = useState('');

  const router = useRouter();
  const themeChanges = router.pathname;

  useEffect(() => {
    const themes = localStorage.getItem('theme');

    if (!themes) {
      setTheme('dark');
      localStorage.setItem('theme', "dark");
    }

  }, [theme]);

  // set pages theme colors
  useEffect(() => {
    if (themeChanges === '/dark-page') {
      setTheme('dark')
      localStorage.setItem('theme', "dark")
    }

    if (themeChanges === '/light-page') {
      setTheme('light')
      localStorage.setItem('theme', "light")
    }

  }, [theme, themeChanges])


  // set theme colors
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
    <main className={lato.className}>
      {/* <Navbar theme={theme} /> */}
      <Component {...pageProps} />
    </main>
  )
}
