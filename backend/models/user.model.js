const { mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
   name:{
    type: String,
    required:true,
    trim: true,
   },
   email:{
    type:String,
    unique: true,
    trim: true,
    lowercase: true,
   },
   password:{
    type: String,
    required: true
   },
   profile_image: {
    type: String,
    default: null
   },
   boards:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Boards'
}],
  role:{
    type: String,
    enum:['admin', 'member'],
    default: 'member'
  },
  created_at:{
    type: Date,
    default: Date.now
  }
},
{
    toJSON: { virtuals: true},
    toObject: { virtuals: true}
});

module.exports = mongoose.model('User', UserSchema);