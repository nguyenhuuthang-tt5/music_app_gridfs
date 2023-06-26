import { useState } from 'react'
import DeleteModal from '../Modal/DeleteModal'
import './Song.css'

export default function Song(props) {
    const [show, setShow] = useState(false);
    const handleOpenModal = () => {
        setShow(true)
    }
    return (
        <>
            <div className={ props.currentId === props.id ? "song active" : "song"}>
                <div className='select-range' onClick={() => props.handleSelectSong(props.id)}>
                    <div className="thumb" style={{ backgroundImage: `url('https://${props.image_url}')` }}></div>
                    <div className="body">
                        <h3 className="title">{props.name}</h3>
                        <p className="author">{props.singer}</p>
                    </div>
                </div>
                <div className="option" onClick={handleOpenModal}>
                    <i className="fas fa-ellipsis-h"></i>
                </div>
            </div>
            <DeleteModal show={show} setShow={setShow} songId={props.id} handleDeleteSong={props.handleDeleteSong}/>
        </>
    )
}