import {useState} from 'react'
import MusicList from '@/components/MusicList/MusicList'
import {collection, getDocs, orderBy, query, where} from "firebase/firestore/lite";
import {db} from "@/constants/firebaseConfig";
import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";
import Header from "@/components/Header/Header";
import styles from "@/styles/Home.module.scss";


const Band = ({ bandName = '', songs }) => {
    const [currentSong, setCurrentSong] = useState()

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
            <Header
                darkmode
                bandname={bandName}
            />
            <main className={`${styles.main} ${styles.dark}`}>
                {songs?.length ?
                    <MusicList
                        type={'SONG'}
                        songs={songs}
                        setCurrentSong={setCurrentSong}
                        currentSong={currentSong}
                    />
                    : <div className={styles.noSongs}>No Songs Found...</div>
                }
            </main>
            {currentSong &&
                <MusicPlayer
                    song={currentSong}
                    prevSong={prevSong}
                    nextSong={nextSong}
                />
            }
        </>
    )
}

export async function getStaticProps({ params }) {
    const bandId = params.bandId;
    const fetchedList = []
    const fetchedSongs = await getDocs(query(collection(db, 'songs'), where('bandID', '==', bandId), orderBy('type', 'desc')))
    fetchedSongs.forEach((song) => {
        fetchedList.push(song.data())
    })
    const bandNames = await getDocs(query(collection(db, 'bands'), where('bandID', '==', bandId)))
    let bandName;
    bandNames.forEach((band) => {
        bandName = band.data().name || ''
    })
    return {
        props: {
            bandId,
            bandName: bandName || '',
            songs: fetchedList.filter(song => song.type === 'SONG'),
        },
        revalidate: 60,
    };
}

export async function getStaticPaths() {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export default Band