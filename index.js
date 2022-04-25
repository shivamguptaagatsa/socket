const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
});
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log(socket.id)
  socket.emit('event', { message: 'Connected !!!!' });

  socket.on('chat message', msg => {
    console.log(msg)
    io.emit('chat message', msg);
  });

  socket.on('esp32', msg => {
    console.log(msg)
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
