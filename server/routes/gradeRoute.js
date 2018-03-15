const express = require('express');
const _ = require('lodash');

const { Course } = require('../model/course');
const { User } = require('../model/user');
const { Grade } = require('../model/grade');

const app = express();

// ------- SELECT Grades ------------------------------------------------------------------

// Get All Grades
app.get('/', (req, res) => {
    var id = req.query.id;
    var course = req.query.course;
    
    getGrade()
    .then((grades) => {
        return getUserGrade(grades, id);    
    })
    .then((grades) => {
        return getOneCourseGrade(grades, course);
    })
    .then((grades) => {
        var gradesJSON = JSON.parse(grades);
        res.send(gradesJSON);
    }).catch((e) => {
        console.log(e);
        res.status(400).send(e);
    });
});

// Get All Test Grades
app.get('/test', (req, res) => {
    var id = req.query.id;
    var course = req.query.course;
    
    getGrade()
    .then((grades) => {
        return getUserGrade(grades, id);    
    })
    .then((grades) => {
        return getOneCourseGrade(grades, course);
    })
    .then((grades) => {
        return getTest(grades);
    })
    .then((tests) => {
        res.send(JSON.parse(tests));
    })
    .catch((e) => {
        console.log(e);
        res.status(400).send(e);
    })
});

// Get All Quiz Grades
app.get('/quiz', (req, res) => {
    var id = req.query.id;
    var course = req.query.course;
    
    getGrade()
    .then((grades) => {
        return getUserGrade(grades, id);    
    })
    .then((grades) => {
        return getOneCourseGrade(grades, course);
    })
    .then((grades) => {
        return getQuiz(grades);
    })
    .then((quizzes) => {
        res.send(JSON.parse(quizzes));
    })
    .catch((e) => {
        console.log(e);
        res.status(400).send(e);
    })
});

// Get All Inclass Grades
app.get('/inclass', (req, res) => {
    var id = req.query.id;
    var course = req.query.course;
    
    getGrade()
    .then((grades) => {
        return getUserGrade(grades, id);    
    })
    .then((grades) => {
        return getOneCourseGrade(grades, course);
    })
    .then((grades) => {
        return getInclass(grades);
    })
    .then((inclasses) => {
        res.send(JSON.parse(inclasses));
    })
    .catch((e) => {
        console.log(e);
        res.status(400).send(e);
    })
});

// Get All Homework Grades
app.get('/homework', (req, res) => {
    var id = req.query.id;
    var course = req.query.course;
    
    getGrade()
    .then((grades) => {
        return getUserGrade(grades, id);    
    })
    .then((grades) => {
        return getOneCourseGrade(grades, course);
    })
    .then((grades) => {
        return getHomework(grades);
    })
    .then((homeworks) => {
        res.send(JSON.parse(homeworks));
    })
    .catch((e) => {
        console.log(e);
        res.status(400).send(e);
    })
});

// ------- INSERT Grades ----------------------------------------------------------------

// Add Grades
app.post('/', (req, res) => {
    var body = _.pick(req.body, ['studentId', 'courseId', 'tests', 'quizzes', 'inclasses', 'homeworks', 'currentGrade']);
    getGrade()
    .then((grades) => {
        return getUserGrade(grades, body.studentId);    
    })
    .then((grades) => {
        return getOneCourseGrade(grades, body.courseId);
    })
    .then((grades) => {
        if(grades.trim.length > 0){
            return res.status(400).send("Grade already exist");
        }else{
            var grade = new Grade({
                studentId : body.studentId,
                courseId : body.courseId,
                tests : body.tests,
                quizzes : body.quizzes,
                inclasses : body.inclasses,
                homeworks : body.homeworks,
                currentGrade : body.currentGrade
            });

            grade.save().then((grades) => {
                res.send({result: true, message: "Successfully Added", grades});
            }).catch((e) => {
                res.status(400).send({result: false, message: "Error", e});
            });
        }
    })    
});

app.post('/test', (req, res) => {
    getGrade()
    res.send()
});

app.post('/quiz', (req, res) => {
    getGrade()
    res.send()
});

app.post('/inclass', (req, res) => {
    getGrade()
    res.send()
});

app.post('/homework', (req, res) => {
    getGrade()
    res.send()
});

// ----- UPDATE Grades ----------------------------------------------------------------
app.put('/', (req, res) => {
    getGrade()
    res.send()
});

app.put('/test', (req, res) => {
    getGrade()
    res.send()
});

app.put('/quiz', (req, res) => {
    getGrade()
    res.send()
});

app.put('/inclass', (req, res) => {
    getGrade()
    res.send()
});

app.put('/homework', (req, res) => {
    getGrade()
    res.send()
});

// ------ DELETE Grades --------------------------------------------------------------------
app.delete('/', (req, res) => {
    getGrade()
    res.send()
});

app.delete('/test', (req, res) => {
    getGrade()
    res.send()
});

app.delete('/quiz', (req, res) => {
    getGrade()
    res.send()
});

app.delete('/inclass', (req, res) => {
    getGrade()
    res.send()
});

app.delete('/homework', (req, res) => {
    getGrade()
    res.send()
});

const getGrade = () => {
    return new Promise((resolve, reject) => {
        Grade.find().then((grades) => {
            resolve(JSON.stringify(grades));
        });
    });
};

const getUserGrade = (grades, id) => {
    var gradeJSON = JSON.parse(grades);

    const userGrade = gradeJSON.filter(grade => grade.studentId == id);
    return JSON.stringify(userGrade);
}

const getOneCourseGrade = (grades, course) => {
    var courseGradeJSON = JSON.parse(grades);

    const oneCourseGrade = courseGradeJSON.filter(grade => grade.courseId == course);
    return JSON.stringify(oneCourseGrade);
}

const getTest = (grades) => {
    var grade = JSON.parse(grades);
    var tests = grade[0].tests;
    console.log(tests);
    console.log(grade);

    return JSON.stringify(tests);

};

const getQuiz = (grades) => {
    var grade = JSON.parse(grades);
    var quizzes = grade[0].quizzes;

    return JSON.stringify(quizzes);
};

const getInclass = (grades) => {
    var grade = JSON.parse(grades);
    var inclasses = grade[0].inclasses;

    return JSON.stringify(inclasses);
};

const getHomework = (grades) => {
    var grade = JSON.parse(grades);
    var homeworks = grade[0].homeworks;

    return JSON.stringify(homeworks); 
};


module.exports = app;