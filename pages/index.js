import { useEffect, useState, useContext } from 'react'
import Image from 'next/image'
import MusicList from '@/components/MusicList/MusicList'
import { db } from '@/constants/firebaseConfig'
import styles from '@/styles/Home.module.scss'
import { ThemeContext } from '@/constants/themeContext'

const types = [
  'SONG',
  'INST',
  'IDEA',
]

export default function Home() {
  const [songs, setSongs] = useState()
  const {
    setCurrentSong,
    currentSong,
    isLoading,
    setIsLoading,
  } = useContext(ThemeContext)

  useEffect(() => {
    db().collection('lyrics').get().then((data) => {
      const sorted = [
        ...data.docs.map(doc => doc.data()).filter(entry => entry.type === 'SONG'),
        ...data.docs.map(doc => doc.data()).filter(entry => entry.type === 'INST'),
        ...data.docs.map(doc => doc.data()).filter(entry => entry.type === 'IDEA'),
      ]      
      setTimeout(() => {
        setSongs(sorted)
        setIsLoading(false)
      }, 500)
    })
  }, [])

  return (
    <>
      {
        isLoading && <div className={styles.loading}><Image src="/loading.gif" height="200" width="210" alt="loading" /></div>
      }
      {
        types.map((type) =>
          <MusicList
            key={type}
            type={type}
            songs={songs?.filter(song => song.type === type)}
            setCurrentSong={setCurrentSong}
            currentSong={currentSong}
          />
        )
      }
    </>
  )
}
