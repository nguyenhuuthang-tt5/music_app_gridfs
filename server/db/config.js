const mongoose = require("mongoose");
const MONGO_URL_CONNECT = "mongodb+srv://thangtt5:5vi6j64n@music-app-cluster.t974suq.mongodb.net/?retryWrites=true&w=majority"

mongoose.set('strictQuery', false)
async function connectMongo() {
    try {
        await mongoose.connect(MONGO_URL_CONNECT, {})
        console.log('connect successfully!');
    } catch(err) {
        console.log(err);
    }
}
connectMongo()
const conn = mongoose.connection
module.exports = {conn, MONGO_URL_CONNECT}