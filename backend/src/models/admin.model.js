const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const adminRegisterSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    password:{
        type: String
    },
    
    verification_token: {
		type: String
	},
},{
	timestamps: {
		createdAt: 'created',
		updatedAt: 'updated'
	},
})

module.exports  = mongoose.model('Admin',adminRegisterSchema);