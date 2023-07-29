import { useContext } from 'react'
import Link from 'next/link'
import styles from '@/styles/Signin.module.scss'
import {ThemeContext} from "@/constants/themeContext";
import SigninForm from "@/components/SigninForm/SigninForm";

const Register = () => {
    const {
        darkmode,
    } = useContext(ThemeContext)

    return (
        <>
            <h1 className={styles.headLine}><span>Registrieren</span></h1>
            <SigninForm type={"register"} />
            <Link className={`${styles.registerLink} ${ darkmode ? styles.dark : '' }`} href={"/signin"}>
                Bereits registriert? Jetzt anmelden!
            </Link>
        </>
    )
}

export default Register