require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const upload = require('./db/grid-service')
const { conn } = require('./db/config');
const SongMethodMongo = require('./api/api')
const ObjectId = require('mongodb').ObjectId
const Grid = require('gridfs-stream');

const app = express()
const port = process.env.PORT_SERVER || 4000

// MIDLEWARE
//
// Add headers before the routes are defined // MIDDLEWARE ACCEPT FRONTEND
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    //
    // Pass to next layer of middleware
    next();
});
//
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
//
let gfs;
let gridfsBucket;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads'
    })
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('uploads')
})

// route
app.get('/', (req, res) => {
    res.render('index')
})
// get all song
app.get('/songs', (req, res) => {
    SongMethodMongo.getAllSongs().then(result => {
        res.send(result)
    }).catch(err => {
        console.log(err);
    })
})
// get song by id
app.get('/song/:songId', (req, res) => {
    const songId = new ObjectId(req.params.songId);
    SongMethodMongo.getSongById(songId).then(result => {
        if(!result) {
            res.status(400).json({
                err: 'No song founded'
            })
        } else {
            res.send(result)
        }
    }).catch(err => {
        console.log(err);
    })
})
// delete song by id
app.post('/delete/:songId', (req, res) => {
    const songId = new ObjectId(req.params.songId);
    SongMethodMongo.getSongById(songId).then(result => {
        const image_id = new ObjectId(result.image_id)
        const song_id = new ObjectId(result.song_id)
        //
        try {
            gridfsBucket.delete(image_id)
            gridfsBucket.delete(song_id)

        } catch(err) {
            console.log('can not delete these files');
        }
        //
        SongMethodMongo.deleteSongById(songId).then(res.redirect('/'))
    })
    // SongMethodMongo.deleteSongById(songId)
})
// stream link image
app.get('/api/data/image/:imageId', (req, res) => {
    const imageId = new ObjectId(req.params.imageId)
    gfs.files.findOne({_id: imageId}, (err, file) => {
        if(!file || file.length == 0) {
            return res.status(404).json({
              err: 'No image exist'
            })
        }
        //check if image
        if(file.contentType === 'image/jpeg' || file.contentType === 'image/jpg' || file.contentType === 'image/png') {
            //read output to browser
            const readStream = gridfsBucket.openDownloadStream(file._id);
            readStream.pipe(res)
        } else {
            res.status(404).json({
                err: 'not an image!'
            })
        }
    })
})
// stream link song
app.get('/api/data/song/:songId', (req, res) => {
    const songId = new ObjectId(req.params.songId)
    gfs.files.findOne({_id: songId}, (err, file) => {
        if(!file || file.length == 0) {
            return res.status(404).json({
              err: 'No song exist'
            })
        }
        //check if song
        if(file.contentType === 'audio/mpeg') {
            //read output to browser
            res.setHeader('accept-ranges', 'bytes')
            res.setHeader('Content-Length', file.length);
            res.setHeader('Content-Range', `bytes 0-${file.length}/${file.length}`);
            const readStream = gridfsBucket.openDownloadStream(file._id);
            readStream.pipe(res)
        } else {
            res.status(404).json({
                err: 'not an song!'
            })
        }
    })
})
// add new song, upload image and mp3 file
app.post('/upload', upload.fields([{name: 'imageFile'}, {name: 'songFile'}]), (req, res) => {
    const data = {
        name: req.body.name,
        singer: req.body.singer,
        image_id: req.files.imageFile[0].id,
        song_id: req.files.songFile[0].id,
        image_url: `${req.get('host')}/api/data/image/${req.files.imageFile[0].id}`,
        song_url: `${req.get('host')}/api/data/song/${req.files.songFile[0].id}`,
    }
    SongMethodMongo.addNewSong(data)
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Server start at https://localhost:${port}/`);
})