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
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket) => {
      console.log('A user connected:', socket.id);

      socket.on('message', (message) => {
        console.log(`Message from user ${socket.id}: ${message}`);
        socket.broadcast.emit('message', message);
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
