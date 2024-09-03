// pages/api/socket.js

import { Server } from 'socket.io';

// Handler for the API Route
export default function handler(req, res) {
  // Ensure that the Socket.IO server is not already initialized
  if (!res.socket.server.io) {
    console.log('Initializing Socket.IO');
    
    // Use the HTTP server instance from res.socket.server
    const io = new Server(res.socket.server, {
      path: '/api/socket',
      cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
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

    // Save the Socket.IO instance to res.socket.server
    res.socket.server.io = io;
  } else {
    console.log('Socket.IO server is already running');
  }
  res.end();
}
