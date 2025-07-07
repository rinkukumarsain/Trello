// listmodel.js
const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    board:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    },
    cards:{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Card'
    },
    order:{
        type:Number,
        default: 0  
    },
   created_at:{
    type: Date,
    default: Date.now()
   }
})

module.exports = mongoose.model('list', listSchema);