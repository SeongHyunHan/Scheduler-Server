const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    studentId : {
        type : Number,
        required: true,
        minLength: 9,
        trim: true,
        unique: true
    },
    name : {
        type : String,
        required: true,
        minLength: 1,
        trim: true
    },
    token: {
        type: String,
        required: false,
        minLength: 1
    }
});

var User = mongoose.model('User', UserSchema);

module.exports= { User };