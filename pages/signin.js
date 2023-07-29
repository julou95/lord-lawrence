import { useContext } from 'react'
import Link from 'next/link'
import SigninForm from "@/components/SigninForm/SigninForm";
import { ThemeContext } from '@/constants/themeContext'
import styles from '@/styles/Signin.module.scss'

const SignIn = () => {
    const {
        darkmode,
    } = useContext(ThemeContext)

    return (
        <>
            <h1 className={styles.headLine}><span>Login</span></h1>
            <SigninForm type={"login"} />
            <Link href="/register" className={`${styles.registerLink} ${darkmode ? styles.dark : ''}`}>
                Noch kein Account? Jetzt registrieren!
            </Link>
        </>
    )
}

export default SignIn