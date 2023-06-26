import './App.css'
import {useEffect, useState, useCallback } from 'react'
import 'font-awesome/css/font-awesome.min.css'
import CurrentSong from './components/CurrentSong/CurrentSong'
import ControlBar from './components/ControlBar/ControlBar';
import ListSong from './components/ListSong/ListSong';
import MongoDataMethod from './api/ApiMethod'
import { IoMdAdd } from 'react-icons/io'
import AddSongModal from './components/Modal/AddSongModal';
import UploadScreen from './components/UploadScreen/UploadScreen';

function App() {
  //State
  const [songs, setSongs] = useState([])
  const [currentSong, setCurrentSong] = useState({})
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false)
  const [uploading, setUploading] = useState(false)
  
  // call api
  async function loadSongsData() {
    MongoDataMethod.getAllSongs().then(result => {
      setSongs(result)
      let storage = localStorage.getItem('currentSong')
      if(storage === null || Object.keys(JSON.parse(storage)).length === 0) {
        localStorage.setItem('currentSong', JSON.stringify(result[0]))
        setCurrentSong(result[0])
      } 
      else {
        setCurrentSong(JSON.parse(storage))
      }
    })
  }
  //
  useEffect(() => {
    loadSongsData()
  }, [])
  //
  const handleSetCurrentSong = (currentSong) => {
    setCurrentSong(currentSong)
    localStorage.setItem('currentSong', JSON.stringify(currentSong))
  }
  //
  const handleDeleteSong = (id) => {
    MongoDataMethod.deleteSongById(id).then(() => {
      if(id === currentSong._id) {
        handleSetCurrentSong(songs[0])
        setIsPlaying(false)
      } 
      loadSongsData()
    })
  }
  //
  const handleAddSong = (formData) => {
    MongoDataMethod.addNewSong(formData).then(() => {
      loadSongsData()
      setUploading(false)
    })
  }
  //
  const handleSelectSong = useCallback((id) => {
    const selectSong = songs.find((song) => song._id === id)
    if(selectSong._id !== currentSong._id) {
      handleSetCurrentSong(selectSong)
    }
  }, [currentSong, songs])
  return (
    <div className='App'>
      {
        uploading && <UploadScreen uploading={uploading} />
      }
      <div className='player'>
        <div className='dashboard'>
          <div className='add-song-btn' onClick={() => setShowAddModal(true)}><IoMdAdd /></div>
          <CurrentSong currentSong={currentSong}/>
          <ControlBar
            songs={songs}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            handleSetCurrentSong={handleSetCurrentSong}
          />
        </div>
        <ListSong songs={songs} currentSong={currentSong} handleSelectSong={handleSelectSong} handleDeleteSong={handleDeleteSong}/>
      </div>
      <AddSongModal showAddModal={showAddModal} setShowAddModal={setShowAddModal} handleAddSong={handleAddSong} setUploading={setUploading}/>
    </div>
  );
}

export default App;
