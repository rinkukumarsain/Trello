const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    text:{
        type:String,
    },
    created_at:{
        type:Date,
        default: Date.now()
    }
   }, {_id: false}
)


const CardSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    description:{
    type: String,
    },
    list:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'List'
    },
    board:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Board'
    },
    order:{
        type:Number,
        default:0,
    },
   assigned_to:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
   },
   attachment:{
    type:String,
    default: null
   },
   comment:[CommentSchema],
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {
        timestamps:{
            createdAt:'created_at',
            updatedAt:'updated_at'
        },
        toJSON: { virtuals : true},
        toObject: {virtuals: true}
    });

module.exports = mongoose.model('Card', CardSchema);