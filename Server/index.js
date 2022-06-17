const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 3001;
var cors = require('cors');
app.use(cors());

const { Server } = require('socket.io');
const { info } = require('console');
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

// EndPoints
app.get('/', (req, res) => {
  res.send('Hello there!');
})

io.on('connection', (socket) => {
  console.log(`User ${socket.id} has connected! [Backend]`)
})

io.on('userMessage', (message) => {
  io.emit('allUsers', message);
})

server.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})