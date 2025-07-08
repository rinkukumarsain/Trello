const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// PORT 
const port = process.env.PORT || 4000;
const connectDB = require('./config/db.config');

connectDB()
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./src/routes/routes'); 
app.use('/api', routes); 


app.listen(port,()=>{
    console.log(`Server running on ${port}`);
})