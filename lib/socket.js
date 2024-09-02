// lib/socket.js

import { io } from 'socket.io-client';

// Ganti URL dengan alamat server Socket.IO Anda
const socket = io('http://localhost:3001');

export default socket;
