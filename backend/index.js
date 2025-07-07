const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

const mongo_url = process.env.MONGO_URL;
mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log(`Mongodb Connected `))
.catch(err =>console.error("Mongodb Connection error:",err));

app.listen(port,()=>{
    console.log(`Server running on ${port}`);
})