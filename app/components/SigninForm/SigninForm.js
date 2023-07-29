import { useRef, useState } from 'react'
import router from 'next/router';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from '@/constants/firebaseConfig'
import styles from '@/styles/Signin.module.scss'

const SigninForm = ({ type = 'login' }) => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [pwError, setPwError] = useState(false)
    const [mailError, setMailError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const signIn = (e) => {
        e.preventDefault()
        if(!emailRef.current.value || !passwordRef.current.value) {
            setMailError(!emailRef.current.value)
            setPwError(!passwordRef.current.value)
            setErrorMessage('Felder müssen ausgefüllt sein')
        } else {
            if (type === 'login') {
                signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
                    .then((userCredentials) => {
                        setMailError(false)
                        setPwError(false)
                        router.push('/')
                    })
                    .catch((error) => {
                        setErrorCodes(error)
                    });
            } else {
                createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
                    .then((userCredentials) => {
                        setMailError(false)
                        setPwError(false)
                        router.push('/')
                    })
                    .catch((error) => {
                        setErrorCodes(error)
                    });
            }
        }
    }

    const setErrorCodes = (error) => {
        const errorCode = error.code;
        setErrorMessage('Email oder Passwort ist falsch')

        if (errorCode.includes('invalid-email')) {
            setMailError(true)
            setErrorMessage('Email-Adresse ist ungültig')
        } else {
            setPwError(true)
            setMailError(true)
        }
    }
    return (
        <>
            <form onSubmit={signIn} method={'POST'}>
                <input
                    className={`${styles.inputField} ${mailError ? styles.error : ''}`}
                    type={"text"}
                    ref={emailRef}
                    name={"email"}
                    onChange={() => setMailError(false)}
                    placeholder={'Email'}
                />
                <input
                    className={`${styles.inputField} ${pwError ? styles.error : ''}`}
                    type={"password"}
                    ref={passwordRef}
                    name={"password"}
                    onClick={() => setPwError(false)}
                    placeholder={'Password'}
                />
                {
                    pwError || mailError
                        ? <div className={styles.errorBox}>{errorMessage}</div>
                        : <></>}
                <input type={'submit'} className={styles.signinButton} onClick={signIn} value={'Login'} />
            </form>
        </>
    )
}

export default SigninForm