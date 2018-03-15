const express = require('express');
const _ = require('lodash');

const { Course } = require('../model/course');
const { User } = require('../model/user');

const app = express();

// Course
//  - Adding Course
app.post('/', (req, res) => {
    // if(!req.session.user){
    //     return res.status(400).send("Session Expired");
    // }
    //var id = req.session.user.studentId;
    var body = _.pick(req.body, ['title', 'code', 'rooms', 'dates', 'notify', 'studentId']);
    var course = new Course({
        title: body.title,
        code: body.code,
        rooms: body.rooms,
        dates: body.dates,
        studentId: body.studentId,
        notify: body.notify
    });

    course.save().then((course) => {
        res.send({result: true, message: "Successfully Added", course});
    }).catch((e) => {
        res.status(400).send({result: false, message: "Error", e});
    });
});

//  - Get all courses
app.get('/', (req, res) => {
    Course.find().then((courses) => {
        if(!courses){
            return res.status(400).send({result: false, message: "No Course Found"});
        }
        res.send({result: true, courses});
    }).catch((e) => {
        res.status(400).send({result: false, message: "Error", e})
    });
});

//  - Remove Course
app.delete('/', (req, res) => {
    var id = req.query.id;
    if(!ObjectID.isValid(id)){
        return res.status(400).send({result: false, message: "ObjectID is Invalid"});
    }

    Course.findByIdAndRemove(id).then((course) => {
        if(!course){
            return res.status(400).send({result: false, message: "Unable to found course"});
        }
        res.send({result: true, message: "Successfully Removed", course});
    }).catch((e) => {
        res.status(400).send({result: false, message: "Error", e});
    });
});

module.exports = app;