// External modules
const schedule = require('node-schedule');
const moment = require('moment');
const admin = require('firebase-admin');

// Internal modules
const { Course } = require('./../model/course');
const { User } = require('../model/user');
const { sendNoti } = require('../firebase/firebase');

const dailySchedule = schedule.scheduleJob('0 6 * * *', () => {
    console.log("dailySchedule function called!");
    getCourses()
    .then((courses) => {
        return selectTodayCourses(courses);
    })
    .then((courses) => {
        return checkNotify(courses);
    })
    .then((courses) => {
        prepareNoti(courses);
    })
    .catch((e) => {
        console.log(e);
    });
    
});

const getCourses = () => {
    return new Promise((resolve, reject) => {
        Course.find().then((courses) => {
            resolve(JSON.stringify(courses));     
        });
    });
};

const selectTodayCourses = (courses) => {
    // JSON object
    const jsonCourses = JSON.parse(courses);

    // Get Current Day & Time
    var currentDay  = moment().format('dddd');
    var time = moment().add(2, 'hours');
    var time2 = moment().format('HH:mm');
    var currentTime = moment(time).format('HH:mm');

    // Get Today's Classes
    const todayClasses = jsonCourses.filter(course => course.dates.some(date => date.day == currentDay));
    return JSON.stringify(todayClasses);
};

const checkNotify = (courses) => {
    var jsonCourses = JSON.parse(courses);

    const notifyCourses = jsonCourses.filter(course => course.notify == true);

    return JSON.stringify(notifyCourses);
}

const prepareNoti = (courses) => {
    var token;
    const title = 'Today\'s Class Info!';
    var result;

    var currentDay  = moment().format('dddd');

    const jsonCourses = JSON.parse(courses);

    User.find().then((users) => {        
        users.forEach((user) => {
            var courseInfoJSON = [];
            token = user.token
            jsonCourses.forEach((course) => {
                var roomNumber;
                var startTime;
                var courseCode;
                course.rooms.forEach((room) => {
                    if(room.day == currentDay && course.studentId == user.studentId){
                       roomNumber = room.roomNumber;
                       courseCode = course.code;
                    }
                });
    
                course.dates.forEach((date) => {
                    if(date.day == currentDay && course.studentId == user.studentId){
                        startTime = date.startTime;
                    }
                });
                if(roomNumber && startTime){
                    courseInfoJSON.push({
                        courseCode,
                        roomNumber,
                        startTime
                    });
                }                    
            });
            
            var courseInfo = '';
            var count = 1;

            if(courseInfoJSON.length == 0){
                courseInfo += "No Class today!";
            }else{
                courseInfoJSON.forEach((course) => {
                    courseInfo += `${course.courseCode} in Room #${course.roomNumber} at ${course.startTime}`;
                    if(count < courseInfoJSON.length){
                        courseInfo += ', '
                        count++;
                    }
                });
            }
            
            sendNoti(title, courseInfo, token);
        });
    });
}

module.exports={
    dailySchedule
};