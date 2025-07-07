const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const messages = []; // Хранилище сообщений

app.use(express.static('public'));

io.on('connection', (socket) => {
  let username = 'Гость';

  socket.on('set username', (name) => {
    username = name;
    socket.emit('chat history', messages);
  });

  socket.on('chat message', (msg) => {
    const message = {
      username,
      text: msg,
      timestamp: new Date(),
    };
    messages.push(message);
    io.emit('chat message', message);
  });
});

http.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
});
