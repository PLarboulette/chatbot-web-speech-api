
'use strict';

const uuid = require('uuid');

const APIAI_TOKEN = 'your_key';
const APIAI_SESSION_ID = uuid.v4();

const apiai = require('apiai')(APIAI_TOKEN);
const express = require('express');

const app = express();

app.use(express.static(__dirname + '/../public'));

const server = app.listen(process.env.PORT || 5000, () => {
    console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

const io = require('socket.io')(server);

io.on('connection', function(socket){
    console.log('a user connected');
});

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

io.on('connection', function(socket) {
    socket.on('message', (text) => {

        // Implement a true logger system
        console.log('Message: ' + text);

        apiai.textRequest(text, {
            sessionId: APIAI_SESSION_ID
        }).on('response', (response) => {
            let aiText = response.result.fulfillment.speech;
            console.log('Bot reply: ' + aiText);
            socket.emit('response', aiText);
        }).on('error', (error) => {
            console.log(error);
        }).end();
    });
});
