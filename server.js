// server.js

import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // URL aplikasi Next.js
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  socket.on('leave_room', (room) => {
    socket.leave(room);
    console.log(`User ${socket.id} left room ${room}`);
  });

  socket.on('send_message', (room, message) => {
    io.to(room).emit('message', message);
    console.log(`Message sent to room ${room}: ${message}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

httpServer.listen(3001, () => {
  console.log('Socket.IO server running on port 3001');
});
