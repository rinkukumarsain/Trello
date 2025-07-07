//  BoardModel.js
const mongoose = require('mongoose');
const BoardSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description: {
        type: String,
        default:''
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
],
    lists :[{
      type:mongoose.Schema.Types.ObjectId, 
      ref:'List'
    }],
    created_at:{
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('Board', BoardSchema);

