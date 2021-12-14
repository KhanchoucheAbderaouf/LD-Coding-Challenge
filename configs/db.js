require('dotenv').config();
const mongoose = require('mongoose')
const connectDB = async () => {
    //connect to the mongodb database using the mongo_uri env var
    await mongoose.connect(process.env.MONGO_URI).then(
        () => {
            //in case of successful connection
            console.log("MongoDB connection Success !!!")
        }).catch((error) => {
        //in case of failure in the connection
        console.log("MongoDB connection Failed !!")
        console.log(error.message)
        process.exit(1)
    })
}

module.exports = connectDB;