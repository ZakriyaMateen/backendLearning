const io = require('socket.io');
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to server');
  socket.emit('send', {
    receiverId: 'someReceiverId',
    content: 'Test message from client'
  });
});

socket.on('newMessage', (message) => {
  console.log('New message received from server:', message);
});