import {useState} from 'react'
import Link from 'next/link'
import styles from '@/styles/Home.module.scss'
import Image from "next/image";
import Icons from "@/components/Icons/Icons";

const Header = ({ user, bandId, bandname = 'Shookbox', darkmode, setDark = () => {}, signOut }) => {
    const [showOptions, setShowOptions] = useState(false)
    const copyBandLink = () => {
        if (bandId) {
            navigator.clipboard.writeText(`https://shookbox.vercel.app/band/${bandId}`)
        }
    }
    return (
        <>
            <header className={styles.header}>
            <div className={styles.innerHeader}>
                <Link href="/">
                    <div className={styles.headerLeft} onClick={() => setShowOptions(false)}>
                        <div className={styles.logo}>
                            <Image src="/logo-96.png" alt="logo" className={styles.logoImg} height="96" width="96" />
                        </div>
                        <div className={styles.title}>
                            {bandname}
                        </div>
                    </div>
                </Link>
                { user?.email &&
                    <div className={`${styles.optionsToggle} ${showOptions ? styles.showOptions : ''}`} onClick={() => setShowOptions(prev => !prev)}>
                        <Icons name="options" size="30" />
                    </div>
                }
            </div>
        </header>
        <div className={`${styles.optionsWrapper} ${showOptions ? styles.optionsVisible : ''}`}>
            <div className={styles.optionsInner}>
                <Link href='/add'>
                    <div className={styles.menuItem} onClick={() => setShowOptions(prev => !prev)}>
                        Add Songs
                        <Icons name="forth" size="30" />
                    </div>
                </Link>
                <div className={styles.menuItem} onClick={() => copyBandLink()}>
                    Bandlink kopieren
                    <Icons name="forth" size="30" />
                </div>
                <div className={styles.menuItem} onClick={() => setDark(!darkmode)}>Theme
                    <div className={styles.themeToggle}>
                        <div className={`${styles.toggleInner} ${darkmode ? styles.toggleDark : ''}`}>
                            <Icons name="light" size="30" />
                            <Icons name="dark" size="30" />
                        </div>
                    </div>
                </div>
                <div className={styles.menuItem} onClick={() => signOut()}>
                    Logout
                    <Icons name="forth" size="30" />
                </div>
            </div>
        </div>
    </>
    )
}

export default Header