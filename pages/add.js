import { useState, useRef, useContext } from 'react'
import { useRouter } from 'next/router'
import styles from '@/styles/Add.module.scss'
import { db, storage } from '@/constants/firebaseConfig'
import { ThemeContext } from '@/constants/themeContext'
import Icons from '@/components/Icons/Icons'

export default function Add() {
  const [showModal, setShowModal] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [durationStr, setDurationStr] = useState()
  const [fileName, setFileName] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const songRef = useRef()
  const titleRef = useRef()
  const typeRef = useRef()
  const lyricsRef = useRef()
  const bpmRef = useRef()
  const noteRef = useRef()
  const { darkmode } = useContext(ThemeContext)
  const router = useRouter()

  const str_pad_left = (string,pad,length) => {
    return (new Array(length+1).join(pad)+string).slice(-length);
  }

  const getDateString = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth()+1;
    const year = date.getFullYear().toString();
    return str_pad_left(day, '0', 2)+'.'+str_pad_left(month, '0', 2)+'.'+year.substring(2)
  }

  const save = () => {
    const file = songRef.current.files[0]
    const refValues = [
      titleRef.current.value,
      typeRef.current.value,
      file?.name || '',
    ]

    const hasEmpty = refValues.some(value => !value);
    const dateStr = getDateString()

    if (!hasEmpty) {
      setIsLoading(true)
      storage().ref(file.name).put(file).then((res) => {
        db().collection('lyrics').doc(file.name.split('.')[0]).set({
          id: file.name.split('.')[0],
          title: titleRef.current.value,
          type: typeRef.current.value,
          media: file.name,
          text: lyricsRef.current.value || '...',
          duration: durationStr,
          bpm: bpmRef.current.value || '-',
          note: noteRef.current.value || '-',
          date: dateStr,
        }).then(() => {
          titleRef.current.value = ''
          typeRef.current.value = ''
          songRef.current.value = ''
          lyricsRef.current.value = ''
          bpmRef.current.value = ''
          noteRef.current.value = ''
          setShowModal(true)
          setIsLoading(false)
          setTimeout(() => {
            router.push('/')
          }, 1000)
        }).catch(err => {
          console.log('LJ - ', 'error', err);
        })
      }).catch((err) => {
        console.log('LJ - ', 'error', err);
      })
    } else {
      setHasError(true)
    }
  }

  const loadAudio = () => {
    const file = songRef.current.files[0]
    const reader = new FileReader();
    if (file) setFileName(file.name)

    reader.onload = async function (event) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      await audioContext.decodeAudioData(event.target.result, function(buffer) {
        // Obtain the duration in seconds of the audio file (with milliseconds as well, a float value)
        const duration = buffer.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        setDurationStr(str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2))
      });
    }

    reader.onerror = function (event) {
      console.error("An error ocurred reading the file: ", event);
    };
    if (file) reader.readAsArrayBuffer(file);
  }

  return (
    <>
    {
      showModal && <div className={styles.modal} onClick={() => setShowModal(false)}><h3>{hasError ? 'OOOPS! fill me up!' : 'YAAAAY!'}</h3></div>
    }
      <h1><span>New Song</span></h1>
      <div className={`${styles.addForm} ${darkmode ? styles.dark : ''}`}>
        <label>Song:</label>
        <label for="file-upload" className={`${styles.uploadButton} ${isLoading ? styles.disabled : ''}`}>
            <div className={styles.songName}>
              {!!fileName ? fileName : 'Select File'}
            </div>
            <div className={styles.uploadIcon}><Icons name="upload" size="25" /></div>
        </label>
        <input id="file-upload" disabled={isLoading} className={`${styles.uploadInput} ${hasError && !songRef.current.value ? styles.error : ''}`} ref={songRef} type="file" accept='audio/*' onChange={loadAudio} />
        <label>Title:</label>
        <input disabled={isLoading} className={hasError && !titleRef.current.value ? styles.error : ''} ref={titleRef} type="text" />
        <label>Type:</label>
        <select disabled={isLoading} ref={typeRef} name="songType">
          <option value="SONG">Song</option>
          <option value="INST">Instrumental</option>
          <option value="IDEA">Idea</option>
        </select>
        <label>Lyrics:</label>
        <textarea disabled={isLoading} ref={lyricsRef} />
        <div className={styles.row}>
          <div>
            <label>BPM:</label>
            <input disabled={isLoading} ref={bpmRef} type="text" />
          </div>
          <div>
            <label>Note:</label>
            <input disabled={isLoading} ref={noteRef} type="text" />
          </div>
        </div>
        <button className={styles.saveButton} onClick={save}>{isLoading ? <Icons name="loading" size="30" /> : 'Beam me up!'}</button>
      </div>
    </>
  )
}
