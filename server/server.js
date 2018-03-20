// Built-in modules
const http = require('http');

// External modules
const express = require('express');
const session = require('express-session');
const _ = require('lodash');
const bodyParser = require('body-parser');
const { ObjectID } = require("mongodb"); 
const admin = require('firebase-admin');
const swaggerUi = require('swagger-ui-express');

// Internal modules
const { mongoose } = require('./db/connection');
const UserRouter = require('./routes/userRoute');
const CourseRouter = require('./routes/courseRoute');
const GradeRouter = require('./routes/gradeRoute');
const { User } = require('./model/user');
const swaggerDocument = require('../swagger.json');


const { dailySchedule } = require('./routes/scheduler');

// Server
//  - Set Port
const port = process.env.PORT || 3000; 
const app = express();


// Add bodyParser middleware for POST methods
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('api/user', UserRouter);
app.use('api/course', CourseRouter);
app.use('api/grade', GradeRouter);

// Start Server if server is up print log
app.listen(port, () => {
    console.log(`Server started at ${port}`);
    // Firebase
    //  - Initialize
    var serviceAccount;
    if(port == 3000){
        serviceAccount = require('../cert/scheduler-165b3-firebase-adminsdk-iybs7-ad72d2fc3d.json')
    }else{
        serviceAccount = JSON.parse(process.env.FCM);
    }
       

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://scheduler-165b3.firebaseio.com/'
    });
});

module.exports = {app};