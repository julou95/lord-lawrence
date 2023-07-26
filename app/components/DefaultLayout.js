import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Icons from '@/components/Icons/Icons'
import MusicPlayer from '@/components/MusicPlayer/MusicPlayer'
import styles from '@/styles/Home.module.scss'
import { db } from '@/constants/firebaseConfig'
import { query, collection, getDocs, orderBy, where } from 'firebase/firestore/lite';
import { useUser } from '@/auth/useUser';

import { ThemeContext } from '@/constants/themeContext'

export default function DefaultLayout({ children }) {
  const [darkmode, setDarkmode] = useState(true)
  const [showOptions, setShowOptions] = useState(false)
  const [currentSong, setCurrentSong] = useState()
  const [songs, setSongs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentBand, setCurrentBand] = useState()
  const [bands, setBands] = useState([])
  const { user, logout } = useUser();

  useEffect(() => {
    const isDark = JSON.parse(localStorage.getItem('DARK')) || false
    setDarkmode(isDark)
  }, [])

  useEffect(() => {
    if (user && !bands.length) {
      const getUserBands = async () => await getBandsFromFS()
      getUserBands()
    }
  }, [user])

  useEffect(() => {
    if (!currentBand?.bandID && bands.length) {
      setCurrentBand(bands[0])
    }
    if (user && bands.length && currentBand?.bandID) {
      const getUserSongs = async () => await getSongs(currentBand?.bandID)
      getUserSongs()
    } else {
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  }, [bands])

  const getBandsFromFS = async () => {
    const bandsArr = []
    const userBands = await getDocs(query(collection(db, 'bands'), where('userID', '==', user?.id)))
    userBands.forEach((entry) => {
      bandsArr.push(entry.data())
    })
    setBands(bandsArr)
    setCurrentBand(bandsArr[0])
    return bandsArr
  }

  const getSongs = async (bandID) => {
    const fetchedList = []
    const fetchedSongs = await getDocs(query(collection(db, 'songs'), where('bandID', '==', bandID)))
    fetchedSongs.forEach((song) => {
      fetchedList.push(song.data())
    })
    setSongs(fetchedList)
    setIsLoading(false)
    return fetchedList
  }

  const setDark = (newVal) => {
    setDarkmode(newVal)
    localStorage.setItem('DARK', newVal)
  }

  const nextSong = (currentId) => {
    const currentIndex = songs.findIndex(song => song.id === currentId)
    if (currentIndex + 1 >= songs.length) {
      setCurrentSong(songs[0])
    } else {
      setCurrentSong(songs[currentIndex + 1])
    }
  }

  const prevSong = (currentId) => {
    const currentIndex = songs.findIndex(song => song.id === currentId)
    if (currentIndex - 1 < 0) {
      setCurrentSong(songs[songs.length - 1])
    } else {
      setCurrentSong(songs[currentIndex - 1])
    }
  }

  const signOut = () => {
    setShowOptions(false)
    logout()
  }

  const getCurrentBandName = () => {
    return bands?.find((band) => band.bandID === currentBand?.bandID)?.name || 'Jukebox'
  }

  return (
    <>
      <Head>
        <title>Lord Lawrence & the Lard Guitar</title>
        <meta name="description" content="Lord Lawrence's Jukebox - all our songs and demos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <div className={styles.innerHeader}>
          <Link href="/">
            <div className={styles.headerLeft} onClick={() => setShowOptions(false)}>
              <div className={styles.logo}>
                <Image src="/logo-96.png" alt="logo" className={styles.logoImg} height="96" width="96" />
              </div>
              <div className={styles.title}>
                {getCurrentBandName()}
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
      <main className={`${styles.main} ${darkmode ? styles.dark : styles.light}`}>
        <ThemeContext.Provider value={{
          darkmode,
          setCurrentSong,
          currentSong,
          isLoading,
          setIsLoading,
          songs,
          currentBand,
          bands,
        }}>
          {children}
        </ThemeContext.Provider>
      </main>
      {
        currentSong &&
          <MusicPlayer
            song={currentSong}
            prevSong={prevSong}
            nextSong={nextSong}
            darkmode={darkmode}
          />
      }
    </>
  )
}
