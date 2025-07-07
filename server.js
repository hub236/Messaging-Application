const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // or your frontend URL
    methods: ["GET", "POST"]
  }
});

app.use(express.static('public'));

io.on('connection', socket => {
  console.log('A user connected');
  socket.on('message', data => {
    io.emit('message', data);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});