const express = require('express');
const _ = require('lodash');

const { User } = require('../model/user');

const app = express();


// User
//  - Create User
app.post('/', (req, res) => {
    var body = _.pick(req.body, ['name', 'studentId', 'token']);
    var user = new User({
        studentId: body.studentId,
        name: body.name,
        token: body.token
    });

    user.save().then((user) => {
        res.send({result: true, message: "User Created", user});
    }).catch((e) => {
        res.status(400).send({result: false, message: "Error", e});
    });
});

//  - Update User
app.post('/', (req, res) => {

});

//  - Get User
app.get('/', (req,res) => {
    User.find().then((users) => {
        if(!users){
            return res.status(400).send({result: false, message: "User not found"});
        }
        res.send({result: true, message: "User Found", users});
    }).catch((e) => {
        res.status(400).send({result: false, message: "Error", e});
    });
});

//  - Get User by Android Token
app.get('/android/:token', (req, res) => {
    var token = req.params.token;
    User.find().then((users) => {
        if(!users){
            return res.status(400).send({result: false, message: "User not found"});
        }
        const user = users.filter(oneUser => oneUser.token.android == token);

        if(user == null){
            return res.status(400).send({result: false, message: "User not found"});
        }
        res.send({result: true, message: "User Found", user});
    }).catch((e) => {
        res.status(400).send({result: false, message: "Error", e});
    })
});

//  - Get User by Apple(ASPN) Token
app.get('/aspn/:token', (req, res) => {
    var token = req.params.token;
    User.find().then((users) => {
        if(!users){
            return res.status(400).send({result: false, message: "User not found"});
        }
        const user = users.filter(oneUser => oneUser.token.aspn == token);


        if(user == null){
            return res.status(400).send({result:false, message: "User not found"});
        }
        res.send({result: true, message: "User Found", user});
    }).catch((e) => {
        res.status(400).send({result: false, message: "Error", e});
    })
})

//  - Get User by Web Token
app.get('/web/:token', (req, res) => {
    var token = req.params.token;
    User.find().then((users) => {
        if(!users){
            return res.status(400).send({result: false, message: "User not found"});
        }

        const user = users.filter(oneUser => oneUser.token.web == token);

        if(user == null){
            return res.status(400).send({result: false, message: "User not found"});
        }
        res.send({result: true, message: "User Found", user})
    }).catch((e) => {
        res.status(400).send({result: false, message: "Error", e});
    })
})

//  - Remove User
app.delete('/', (req, res) => {
    var id = req.query.id;
     //validate the id -> not valid return 404
     if(!ObjectID.isValid(id)){
        return res.status(404).send({result: false, message: "ObjectId is not valid"});
    }
    //remove User by id
    //success
        // if no user, send 404
        // if user, send user back with 200
    //error
        // 400 with empty body
    User.findByIdAndRemove(id).then((user) => {
        if(!user){
            return res.status(400).send({result : false, message: "No user found"});
        }
        res.send({result: true, message: "Sucessfully Removed", user});
    }).catch((e) => res.status(400).send({result: false, message: "Error", e}));
});

module.exports = app;