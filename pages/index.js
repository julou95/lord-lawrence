import { useContext, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MusicList from '@/components/MusicList/MusicList'
import styles from '@/styles/Home.module.scss'
import { ThemeContext } from '@/constants/themeContext'
import withAuth from '@/auth/withAuth';
import { useUser } from '@/auth/useUser';
import { doc, setDoc } from "firebase/firestore/lite";
import { db } from "@/constants/firebaseConfig";
import { useRouter } from 'next/router'
import Icons from "@/components/Icons/Icons";

const types = [
  'SONG',
  'DEMO',
  'INST',
  'IDEA',
]

const  Home = () => {
  const { user } = useUser();
  const bandNameRef = useRef();
  const router = useRouter();

  const {
    setCurrentSong,
    currentSong,
    isLoading,
    songs,
    bands,
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
        isLoading && <div className={styles.loading}><Image src="/loading.gif" height="200" width="210" alt="loading" /></div>
      }
      {
        !isLoading && !bands.length &&
          <>
            <h1><span>Band hinzufügen</span></h1>
            <input className={styles.inputName} ref={bandNameRef} type={'text'} placeholder={'Bandname'} />
            <button onClick={saveBand} className={styles.addBand}>Speichern</button>
          </>
      }
      {
        !isLoading && bands.length && !songs.length &&
          <div className={styles.noSongs}>
            <h2><span>Ooops...</span></h2>
            There were no Songs found for your Band.
            <Link className={styles.addSongLink} href={"/add"}>
              Add songs now
            </Link>
          </div>
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

export default withAuth(Home)