import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Header from '@/components/Header/Header'
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
  const [band, setBand] = useState({})
  const { user, logout } = useUser();

  useEffect(() => {
    const isDark = JSON.parse(localStorage.getItem('DARK')) || false
    setDarkmode(isDark)
  }, [])

  useEffect(() => {
    if (user && !band?.name) {
      const getUserBands = async () => await getBandsFromFS()
      getUserBands()
    }
  }, [user])

  useEffect(() => {
    if (user) {
      if (band?.name) {
        const getUserSongs = async () => await getSongs()
        getUserSongs()
      } else {
        setTimeout(() => setIsLoading(false), 500)
      }
    }
  }, [band])

  useEffect(() => {
    if (songs.length) {
      setIsLoading(false)
    }
  }, [songs])

  const getBandsFromFS = async () => {
    let currband;
    const userBands = await getDocs(query(collection(db, 'bands'), where('userID', '==', user?.id)))
    userBands.forEach((entry) => {
      currband = entry.data()
    })
    setBand(currband)
    return currband
  }

  const getSongs = async () => {
    const fetchedList = []
    const fetchedSongs = await getDocs(query(collection(db, 'songs'), where('bandID', '==', band.bandID), orderBy('type', 'desc')))
    fetchedSongs.forEach((song) => {
      fetchedList.push(song.data())
    })
    setSongs(fetchedList)
    if (!fetchedList.length) {
      setTimeout(() => setIsLoading(false), 500)
    }
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
    return band?.name || 'Jukebox'
  }

  return (
    <>
      <Head>
        <title>Shookbox</title>
        <meta name="description" content="Shookbox - all our songs and demos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        darkmode={darkmode}
        setDark={setDark}
        bandname={getCurrentBandName()}
        bandId={band.bandID}
        user={user}
        signOut={signOut}
      />
      <main className={`${styles.main} ${darkmode ? styles.dark : styles.light}`}>
        <ThemeContext.Provider value={{
          darkmode,
          setCurrentSong,
          currentSong,
          isLoading,
          setIsLoading,
          songs,
          band,
          user,
        }}>
          {!isLoading || !user?.id ? children : <div className={styles.loading}><Image src="/loading.gif" height="200" width="210" alt="loading" /></div>}
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
