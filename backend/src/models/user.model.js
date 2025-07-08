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
UserSchema.pre('save', function(next){
  var user = this;
  if(!user.isModified('password')) return next();
  
  bcrypt.genSalt(10, function(err, salt) {
    if(err) return next(err);
    bcrypt.hash(user.password, salt,function(err, hash){
      if(err) return next(err);

      user.password = hash;
      next();
    });
  });
});

// Add method to compare password
UserSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model('User', UserSchema);