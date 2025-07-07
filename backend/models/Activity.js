const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    board:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Board',
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    action:{
        type: String
    },
    card:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Card',
        required: false
    },
},
    {timeStamps: true}
);

module.exports = mongoose.model('Activity', ActivitySchema);
