const express = require('express');
const http = require('http');
const app = express();


const port = 8080;

const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));

const server = http.createServer(app);
server.listen(8080, () =>{
    console.log("server running on "+port);
});


const io = require('socket.io')(server);

let counter = 0;

let usersArray = [];

io.on('connection', (socket) => {
        counter++;
        console.log(counter+'someone connected');

        //broadcast will emit to everybody except the user that is connecting
        socket.broadcast.emit('message','A user has joined chatter');

        //To send the whole array to one specific socket, you would do something like this:


        //when there is a disconnect
        socket.on('disconnect',()=>{
        io.emit('message','A user has left chatter');
        })

        socket.on('sendToAll', (message) => {
        // io emit will message every user connected
        io.emit("displayMessage", (message));
        });

        socket.on("sendToOwn", (message) => {
        // socket emit will only send a message to the user him self
        socket.emit("displayMessage", message);
        });

        socket.on("logIn", (username) => {
           usersArray.push(username);
                io.emit("logUsers",usersArray);
        });

});




