const mongoose = require('mongoose')

const SongModel = new mongoose.Schema({
    name: {
        type: String
    },
    singer: {
        type: String
    },
    image_id: {
        type: String
    },
    song_id: {
        type: String
    },
    image_url: {
        type: String
    },
    song_url: {
        type: String
    }
})
module.exports = mongoose.model('songs', SongModel)