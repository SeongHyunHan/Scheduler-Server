// External modules
const admin = require('firebase-admin');

const sendNoti = (title, courseInfo, token) => {

    var num = courseInfo.length;
    //  - Message Payload
    var payload = {
        data:{
            courseInfo
        },
        android: {
            ttl: 3600 * 1000, // 1 hour
            priority: 'normal',
            notification: {
                title,
                body: `${courseInfo}`
            }
        },
        token
    };

    //  - Send a message to device
    admin.messaging().send(payload).then((response) => {
        console.log(`Successfully sent message: ${response}`);
    }).catch((err) =>{
        console.log(`Error sending message: ${err}`);
    });
}

module.exports = { sendNoti };