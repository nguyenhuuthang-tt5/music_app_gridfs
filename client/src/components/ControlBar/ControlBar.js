import { Fragment, useRef, useState, useCallback, useEffect} from 'react'
import './ControlBar.css'

export default function ControlBar(props) {
    const audioPlayer = useRef()
    const [isRepeat, setIsRepeat] = useState(false);
    const [isRandom, setIsRandom] = useState(false);
    const [currentPercent, setCurrentPercent] = useState(0)

    // play, pause song
    useEffect(() => {
        if(props.isPlaying) {
        audioPlayer.current.play()
        } else {
        audioPlayer.current.pause()
        }

    }, [props.isPlaying, props.currentSong])
    // ontimeupdate, when song playing
    const onPlaying = () => {
        setCurrentPercent(
        Math.floor(audioPlayer.current.currentTime / audioPlayer.current.duration * 100)
        )
    }
    // when song ended
    const onEnded = () => {
        if(isRepeat) {
        audioPlayer.current.play()
        }
        else if(isRandom) {
        handleRandomSong()
        }
        else {
        handleNextBtnClick()
        }
    }
    //
    const handleRandomSong = () => {
        //need evolution
        let currentSong = props.songs[Math.floor(Math.random() * props.songs.length)]
        props.handleSetCurrentSong(currentSong)
        audioPlayer.current.play()
    }
    //
    const handleNextBtnClick = useCallback(() => {
        let currentSongIndex = props.songs.indexOf(props.songs.find((song) => song._id === props.currentSong._id))
        let currentSong;
        if(currentSongIndex === props.songs.length - 1) {
            currentSong = props.songs[0]
        } else {
            currentSong = props.songs[currentSongIndex + 1]
        }
        props.handleSetCurrentSong(currentSong)
        props.setIsPlaying(true)
    }, [props])
    //
    const handlePrevBtnClick = useCallback(() => {
        let currentSongIndex = props.songs.indexOf(props.songs.find((song) => song._id === props.currentSong._id))
        let currentSong;
        if(currentSongIndex <= 0) {
            currentSong = props.songs[props.songs.length - 1]

        } else {
            currentSong = props.songs[currentSongIndex - 1]
        }
        props.handleSetCurrentSong(currentSong)
        props.setIsPlaying(true)
    }, [props])
    //
    const handleChangePercent = (value) => {
        let seekTime = audioPlayer.current.duration / 100 * value
        audioPlayer.current.currentTime = seekTime
        audioPlayer.current.play()
    }

    return (
        <Fragment>
            {
                !props.currentSong ? 
                <>
                    <audio 
                        ref={audioPlayer} 
                        src={null} 
                        onTimeUpdate={onPlaying}
                        onEnded={onEnded}
                        >  
                    </audio>
                    <div className="control">
                        <div className={"btn btn-repeat"}>
                            <i className="fas fa-redo"></i>
                        </div>
                        <div className="btn btn-prev">
                            <i className="fas fa-step-backward"></i>
                        </div>
                        <div className="btn btn-toggle-play">
                            {
                                props.isPlaying ? <i className="fas fa-pause icon-pause"></i> : <i className="fas fa-play icon-play"></i>
                            }
                        </div>
                        <div className="btn btn-next">
                            <i className="fas fa-step-forward"></i>
                        </div>
                        <div className={"btn btn-random"}>
                            <i className="fas fa-random"></i>
                        </div>
                    </div>
                    <input id="progress" className="progress" type="range" value={0} step="1" min="0" max="100"></input>
                </>
                :
                <>
                    <audio 
                        ref={audioPlayer} 
                        src={`https://${props.currentSong.song_url}`} 
                        onTimeUpdate={onPlaying}
                        onEnded={onEnded}
                        >  
                    </audio>
                    <div className="control">
                        <div className={isRepeat ? "btn btn-repeat active" : "btn btn-repeat"} onClick={() => setIsRepeat(!isRepeat)}>
                            <i className="fas fa-redo"></i>
                        </div>
                        <div className="btn btn-prev" onClick={handlePrevBtnClick}>
                            <i className="fas fa-step-backward"></i>
                        </div>
                        <div className="btn btn-toggle-play" onClick={() => props.setIsPlaying(!props.isPlaying)}>
                            {
                                props.isPlaying ? <i className="fas fa-pause icon-pause"></i> : <i className="fas fa-play icon-play"></i>
                            }
                        </div>
                        <div className="btn btn-next" onClick={handleNextBtnClick}>
                            <i className="fas fa-step-forward"></i>
                        </div>
                        <div className={isRandom ? "btn btn-random active" : "btn btn-random"} onClick={() => setIsRandom(!isRandom)}>
                            <i className="fas fa-random"></i>
                        </div>
                    </div>
                    <input id="progress" className="progress" type="range" value={currentPercent} onChange={(e) => handleChangePercent(e.target.value)} step="1" min="0" max="100"></input>
                </>
            }
        </Fragment>
    )
}