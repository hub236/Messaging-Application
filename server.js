const fs = require('fs');
const https = require('https');
const express = require('express');
const socketIO = require('socket.io');

const app = express();

// SSL cert
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/fullchain.pem')
};

const server = https.createServer(options, app);
const io = socketIO(server);

// Serve frontend
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(443, () => {
  console.log('Server running at https://yourdomain.com');
});
