const mongoose = require('mongoose');

var Course = mongoose.model('Course', {
    // course title
    title : {
        type: String,
        required: true,
        trim: true
    },
    // course code
    code : {
        type: String,
        trim: true
    },
    // course location
    rooms : [{
        roomNumber: {
            type: String,
            trim: true
        },
        day : {
            type: String,
            trim: true
        }
    }],
    dates : [{
        day : {
            type: String,
            required: true
        },
        startTime : {
            type: String,
            required: true
        },
        endTime : {
            type: String,
            required: true
        }
    }],
    studentId : {
        type : String,
        required: true,
        trim: true
    },
    notify : {
        type: Boolean,
        default: false
    }
});

module.exports = {Course};