const SongModel = require('../models/SongModel')

const SongMethodMongo = {
    getAllSongs: async () => await SongModel.find(),
    getSongById: async (id) => await SongModel.findById(id),
    addNewSong: async (args) => {
        const newSong = new SongModel(args);
        return newSong.save((err) => {
            console.log(err);
        })
    },
    deleteSongById: async (id) => await SongModel.deleteOne({_id : id})
    .then(() => {
        console.log('delete success');
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = SongMethodMongo