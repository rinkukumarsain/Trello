
const mongoose = require('mongoose');

const connectDB = async() =>{
    const url = process.env.MONGO_URL
    console.log(url);
    try{
        await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

        console.log('Mongodb Connected Successfully')
    }
    catch(error){
        console.log('Mongodb connection error:', error);
        process.exit(1);
    }
};
module.exports = connectDB;
