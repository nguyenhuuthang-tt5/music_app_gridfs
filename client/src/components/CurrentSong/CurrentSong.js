import { useEffect, useState } from 'react'
import './CurrentSong.css'
import { motion } from 'framer-motion'

export default function CurrentSong(props) {
    const [rotate, setRotate] = useState(false)
    const [changeWidth, setChangeWidth] = useState(200)
    const [opacity, setOpacity] = useState(1)

    useEffect(() => {
        window.addEventListener('scroll', (e) => {
            let newWidth = changeWidth - e.currentTarget.scrollY
            newWidth = newWidth < 0 ? 0 : newWidth;
            setChangeWidth(newWidth > 0 ? newWidth : 0)
            setOpacity(newWidth / 200)
        })
    }, [])
    //
    return (
        <div>
            {
                !props.currentSong ?
                <>
                    <header>
                        <h4>List song is empty</h4>
                    </header>
                    <div className='cd' style={{width: '200px'}}>
                        <div className="cd-thumb">
                        </div>
                    </div>
                </> :
                <>
                    <header>
                        <h4>Now playing:</h4>
                        <h2>{ props.currentSong.name }</h2>
                    </header>
                    <div className="cd" style={{width: `${changeWidth}px`, opacity: `${opacity}`}}>
                        <motion.div
                            animate={{rotate: props.isPlaying ? 360 : 0}}
                            onClick={() => setRotate(!rotate)}
                            className="cd-thumb" style={{ backgroundImage: `url('https://${props.currentSong.image_url}')` }}>

                        </motion.div>
                    </div>
                </>
            }
        </div>
    )
}