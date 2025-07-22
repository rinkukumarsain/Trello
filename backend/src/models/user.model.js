// User Model.js
const  mongoose = require("mongoose");
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
  
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
   
  },
  password: {
    type: String,
    required: true,
    // Password will be hashed before saving
  },
  profile_image: {
    type: String,
    default: null,
    
  },
  status: {
    type: String,
    default: "active",
  },
  boards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",    
    }
  ],
  role: {
    type: String,
    enum: ["admin", "member"],
    default: "member",
    
  },
  created_at: {
    type: Date,
    default: Date.now,
    // When the user was registered
  }
},
{
  toJSON: { virtuals: true },  
  toObject: { virtuals: true } 
});

//  Hash password before saving

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', UserSchema);