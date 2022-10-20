import { useState, useEffect, useContext } from 'react'
import Router from "next/router";
import styles from '@/styles/Remove.module.scss'
import { db, storage } from '@/constants/firebaseConfig'
import { ThemeContext } from '@/constants/themeContext'
import Icons from '@/components/Icons/Icons'

export default function Remove() {
  const [songs, setSongs] = useState()
  const [songsToDelete, setSongsToDelete] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { darkmode } = useContext(ThemeContext)

  useEffect(() => {
    loadSongs()
  }, [])

  const loadSongs = () => {
    db().collection('lyrics').get().then((data) => {
      const sorted = [
        ...data.docs.map(doc => doc.data()).filter(entry => entry.type === 'SONG'),
        ...data.docs.map(doc => doc.data()).filter(entry => entry.type === 'INST'),
        ...data.docs.map(doc => doc.data()).filter(entry => entry.type === 'IDEA'),
      ]      
      setSongs(sorted)
    })
  }

  const isChecked = (id) => {
    return !!songsToDelete?.find(entry => entry.id === id)
  }

  const pushToList = (song) => {
    if (isChecked(song.id)) {
      setSongsToDelete(songsToDelete.filter((entry) => entry.id !== song.id))
    } else {
      const newList = [...songsToDelete]
      newList.push(song)
      setSongsToDelete(newList)
    }
  }

  const confirmDelete = () => {
    setIsLoading(true)
    songsToDelete.forEach(song => {
      db().collection('lyrics').doc(song.id).delete().then(() => {
        storage().ref(song.media).delete().then(() => {
          setShowSuccess(true)
          setTimeout(() => {
            setShowModal(false)
            setShowSuccess(false)
            setIsLoading(false)
            loadSongs()
          }, 1000)
        }).catch((error) => {
          console.log('LJ - storage error', error);
        })
      }).catch((error) => {
        console.log('LJ - firestore error', error);
      })
    })
  }

  return (
    <div className={darkmode ? styles.dark : ''}>
      <h1><span>Delete Song</span></h1>
      <div className={styles.songlist}>
        {
          songs && songs.map((song) =>
            <div key={song.id} className={styles.songEntry} onClick={() => pushToList(song)}>
              <div className={styles.songEntryLeft}>
                <div className={`${styles.trashIcon} ${isChecked(song.id) ? styles.checked : ''}`}>
                  <Icons name="trash" size="25" />
                </div>
                {song.title}
              </div>
              {song.type}
            </div>
          )
        }
      </div>
      {
        !!songsToDelete.length &&
          <button className={styles.deleteSongsButton} onClick={() => setShowModal(true)}>
            Delete {songsToDelete.length} songs
          </button>
      }
      {
        showModal &&
          <div className={styles.confirmationModal}>
            {
              showSuccess ?
                <h3>YAAAAAAY</h3> :
                <>
                  <h3>You&apos;re about to delete the following songs:</h3>
                  <div className={styles.deleteSongList}>
                    {
                      songsToDelete.map(song =>
                        <div key={song.id} className={styles.songToDeleteEntry}>
                          <div>{song.title}</div>
                          <div>{song.type}</div>
                        </div>
                      )
                    }
                  </div>
                  <div className={styles.actionButtons}>
                    <button onClick={() => setShowModal(false)}>cancel</button>
                    <button onClick={confirmDelete} className={styles.confirmDelete}>
                      {isLoading ? <Icons name="loading" size="25" /> : 'delete'}
                    </button>
                  </div>
                </>
            }
          </div>
      }
    </div>
  )
}
