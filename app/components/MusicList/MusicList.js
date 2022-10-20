import styles from '@/styles/MusicList.module.scss'
import MusicEntry from '@/components/MusicEntry/MusicEntry'

const types = {
  INST: 'Instrumentals',
  SONG: 'Songs',
  IDEA: 'Ideas',
}

export default function MusicList({ type, songs = [], setCurrentSong, currentSong }) {
  return (
    <div className={styles.musicList}>
      {songs.length ? <h1><span>{types[type]}</span></h1> : ''}
      {
        songs
          .map((entry) =>
            <MusicEntry
              key={entry.id}
              entry={entry}
              setCurrentSong={setCurrentSong}
              currentSong={currentSong}
            />
          )
      }
    </div> 
  )
}
