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

// EndPoints
io.on("connection", (socket) => {
  socket.on("sendToAll", (msg) => {
    io.emit("sendingToAll", msg);
  });

  socket.on("newMsg", (msg) => {
    io.emit("sentNewMsg", msg);
    console.log(msg);
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
