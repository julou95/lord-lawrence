import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Icons from '@/components/Icons/Icons'
import MusicPlayer from '@/components/MusicPlayer/MusicPlayer'
import styles from '@/styles/Home.module.scss'
import { db } from '@/constants/firebaseConfig'

import { ThemeContext } from '@/constants/themeContext'

export default function DefaultLayout({ children }) {
  const [darkmode, setDarkmode] = useState(true)
  const [showOptions, setShowOptions] = useState(false)
  const [currentSong, setCurrentSong] = useState()
  const [songs, setSongs] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const isDark = JSON.parse(localStorage.getItem('DARK')) || false
    setDarkmode(isDark)
    db().collection('songs').get().then((data) => {
      const sorted = [
        ...data.docs.map(doc => doc.data()).filter(entry => entry.type === 'SONG').sort((a,b) => a.nr - b.nr),
        ...data.docs.map(doc => doc.data()).filter(entry => entry.type === 'DEMO').sort((a,b) => a.nr - b.nr),
        ...data.docs.map(doc => doc.data()).filter(entry => entry.type === 'INST').sort((a,b) => a.nr - b.nr),
      ]
      
      setTimeout(() => {
        setSongs(sorted)
        setIsLoading(false)
      }, 500)
    })
  }, [])

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

  return (
    <>
      <Head>
        <title>Lord Lawrence & the Lard Guitar</title>
        <meta name="description" content="Cozy's Jukebox - all our songs and demos" />
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
                Lord Lawrence
              </div>
            </div>
          </Link>
          <div className={`${styles.optionsToggle} ${showOptions ? styles.showOptions : ''}`} onClick={() => setShowOptions(prev => !prev)}>
            <Icons name="options" size="30" />
          </div>
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
          <Link href="/remove">
            <div className={styles.menuItem} onClick={() => setShowOptions(prev => !prev)}>
              Remove Songs
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
