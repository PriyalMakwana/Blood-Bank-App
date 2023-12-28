const mongoose = require("mongoose")
const colors = require ('colors')


const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to database ${mongoose.connection.host}`.bgMagenta.white);
    } catch(err){
        console.log(`mongodb database error ${err}` .bgRed.white);
    }
};

module.exports = connectDB