import axios from 'axios'
import API_ROOT from '../config/config'

const config = {     
    headers: { 'content-type': 'multipart/form-data' }
}

const MongoDataMethod = {
    getAllSongs: async () => { 
        return await axios.get(`${API_ROOT}/songs`)
        .then(result => result.data)
        .catch(err => {
            console.log(err.message);
        })
    },
    //
    deleteSongById: async (id) => await axios.post(`${API_ROOT}/delete/${id}`),
    //
    addNewSong: async (formData) => await axios.post(`${API_ROOT}/upload`, formData, config)
}

export default MongoDataMethod