
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const ConnectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to database")

    }
    catch(err){
        console.log(err)
    }
}


module.exports = ConnectDB