const mongoose = require('mongoose');

var gradeSchema = new mongoose.Schema({
    studentId : {
        type : Number,
        required: true,
        minLength: 9,
        trim: true
    },
    courseId : {
        type : String,
        required : true,
        unique : true
    },
    tests : {
        number : {
            type : Number,
            required : true,
        },
        totalWeight : {
            type : Number,
            required : true
        },
        grades : [{
            unWeightedGrade : {
                type : Number,
                required : false,
            },
            weightedGrade : {
                type : Number,
                required : false
            }
        }]        
    },
    quizzes : {
        number : {
            type : Number,
            required : true,
        },
        totalWeight : {
            type : Number,
            required : true
        },
        grades : [{
            unWeightedGrade : {
                type : Number,
                required : false,
            },
            weightedGrade : {
                type : Number,
                required : false
            }
        }]     
    },
    inclasses : {
        number : {
            type : Number,
            required : true,
        },
        totalWeight : {
            type : Number,
            required : true
        },
        grades : [{
            unWeightedGrade : {
                type : Number,
                required : false,
            },
            weightedGrade : {
                type : Number,
                required : false
            }
        }]     
    },
    homeworks : {
        number : {
            type : Number,
            required : true,
        },
        totalWeight : {
            type : Number,
            required : true
        },
        grades : [{
            unWeightedGrade : {
                type : Number,
                required : false,
            },
            weightedGrade : {
                type : Number,
                required : false
            }
        }]     
    },
    currentGrade : {
        type : Number,
        required : false
    }
});

var Grade = mongoose.model('Grade', gradeSchema);

module.exports = { Grade };