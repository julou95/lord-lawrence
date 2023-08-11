import { useContext, useRef } from 'react'
import Link from 'next/link'
import MusicList from '@/components/MusicList/MusicList'
import styles from '@/styles/Home.module.scss'
import { ThemeContext } from '@/constants/themeContext'
import withAuth from '@/auth/withAuth';
import { doc, setDoc } from "firebase/firestore/lite";
import { db } from "@/constants/firebaseConfig";
import { useRouter } from 'next/router'

const types = [
  'SONG',
  'DEMO',
  'INST',
  'IDEA',
]

const  Home = () => {
  const bandNameRef = useRef();
  const router = useRouter();

  const {
    setCurrentSong,
    currentSong,
    songs,
    band,
    user,
  } = useContext(ThemeContext)

  const saveBand = () => {
    const bandID = bandNameRef.current.value.split(' ').join('');
    setDoc(doc(db, 'bands', bandID), {
      bandID,
      name: bandNameRef.current.value,
      userID: user.id,
    }).then(() => {
      bandNameRef.current.value = ''
      router.push('/')
    })
  }

  return (
    <>
      {
        user?.id && !band ?
          <>
            <h1><span>Band hinzufügen</span></h1>
            <input className={styles.inputName} ref={bandNameRef} type={'text'} placeholder={'Bandname'} />
            <button onClick={saveBand} className={styles.addBand}>Speichern</button>
          </> : <></>
      }
      {
        user?.id && band && !songs.length ?
          <div className={styles.noSongs}>
            <h2><span>Ooops...</span></h2>
            There were no Songs found for your Band.
            <Link className={styles.addSongLink} href={"/add"}>
              Add songs now
            </Link>
          </div> : <></>
      }
      {songs.length ?
        types.map((type) =>
          <MusicList
            key={type}
            type={type}
            songs={songs?.filter(song => song.type === type)}
            setCurrentSong={setCurrentSong}
            currentSong={currentSong}
          />
        ) : <></>
      }
    </>
  )
}

export default withAuth(Home)