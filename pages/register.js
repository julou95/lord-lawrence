import { useRef } from 'react'
import router from 'next/router';
import Link from 'next/link'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useUser } from '@/auth/useUser'
import { auth } from '@/constants/firebaseConfig'
import styles from '@/styles/Signin.module.scss'

const Register = () => {
    const { user} = useUser();
    const emailRef = useRef()
    const passwordRef = useRef()

    const signIn = () => {
        createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .then((userCredentials) => {
                router.push('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("🐞 - errorCode, errorMessage:", errorCode, errorMessage)
            });
    }
    return (
        <>
            <h1 className={styles.headLine}><span>Registrieren</span></h1>
            <input
                className={styles.inputField}
                type={"text"}
                ref={emailRef}
                name={"email"}
                placeholder={'Email'}
            />
            <input
                className={styles.inputField}
                type={"password"}
                ref={passwordRef}
                name={"password"}
                placeholder={'Password'}
            />
            <button className={styles.signinButton} onClick={signIn}>
                Registrieren
            </button>
            <div className={styles.registerLink}>
                <Link href={"/signin"}>
                    Bereits registriert? Jetzt anmelden!
                </Link>
            </div>
        </>
    )
}

export default Register