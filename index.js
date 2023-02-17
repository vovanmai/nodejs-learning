const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var dotenv = require('dotenv');
dotenv.config();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log(socket.id)
    socket.on('chat message', (msg) => {
        console.log('abc888' + msg)
        io.emit('chat message', msg);
    });
});
server.listen(process.env.PORT || '3000', () => {
    console.log('http://localhost:' + process.env.PORT || '3000');
});
