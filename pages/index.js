import { useContext } from 'react'
import Image from 'next/image'
import MusicList from '@/components/MusicList/MusicList'
import styles from '@/styles/Home.module.scss'
import { ThemeContext } from '@/constants/themeContext'

const types = [
  'SONG',
  'DEMO',
  'INST',
]

export default function Home() {
  const {
    setCurrentSong,
    currentSong,
    isLoading,
    songs,
  } = useContext(ThemeContext)

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
