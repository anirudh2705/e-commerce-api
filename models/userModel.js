const { mongoose } = require("mongoose");
const validator = require('validator')

const UserSchema = mongoose.Schema({
    name: {
        type:String,
        required:[true, 'name cannot be empty'],
    },
    email:{
        type:String,
        required:[true, 'email cannot be empty'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email'
        }
    },
    password:{ 
        type:String,
        required:[true, 'password cannot be empty'],
        minlength: [6, 'password must be at least 6 characters'],
    },
    role:{
        type:String,
        enum: ['admin', 'user'],
        default: 'user'
    }

}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)