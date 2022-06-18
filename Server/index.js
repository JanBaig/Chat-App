const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = 3001;
var cors = require("cors");
app.use(cors());

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.get("/", (req, res) => {
  res.send("Hello there!");
});

// When all connect
io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);

  // Send message announcement to all excluding new user
  socket.on("newUser", (id) => {
    socket.broadcast.emit("announceUsername", `${id} has arrived!`);
  });

  // When the socket disconnects
  socket.on('disconnect', () => {
    socket.broadcast.emit('userDisconnected', `user has disconnected`)
  });

  // Display new message to all connected
  socket.on("newMsg", (msg) => {
    io.emit("sentNewMsg", msg);
  });

});

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
