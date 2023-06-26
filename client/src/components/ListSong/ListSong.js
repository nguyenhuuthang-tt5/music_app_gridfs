import Song from '../Song/Song'
import './ListSong.css'

export default function ListSong(props) {
    return (
        <div className="playlist">
            {
                !props.songs ? 
                <>
                    <p>List song is empty</p>
                </> :
                <>
                    {props.songs.map((song, index) => <Song key={index} 
                        id={song._id} 
                        name={song.name} 
                        singer={song.singer} 
                        image_url={song.image_url} 
                        currentId={props.currentSong._id} 
                        handleSelectSong={props.handleSelectSong}
                        handleDeleteSong={props.handleDeleteSong}
                    />)}
                </>
            }
        </div>
    )
}