import { useContext } from 'react'
import Link from 'next/link'
import SigninForm from "@/components/SigninForm/SigninForm";
import { ThemeContext } from '@/constants/themeContext'
import styles from '@/styles/Signin.module.scss'
import Header from "@/components/Header/Header";
import MusicList from "@/components/MusicList/MusicList";
import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";

const SignIn = () => {
    const {
        darkmode,
    } = useContext(ThemeContext)

    return (
        <>
            <Header
                darkmode
            />
            <main className={`${styles.main} ${styles.darkmode}`}>
            <h1 className={styles.headLine}><span>Login</span></h1>
            <SigninForm type={"login"} />
            <Link href="/register" className={`${styles.registerLink} ${darkmode ? styles.dark : ''}`}>
                Noch kein Account? Jetzt registrieren!
            </Link>
            </main>
        </>
    )
}

export default SignIn