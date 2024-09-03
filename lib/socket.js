// lib/socket.js

import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  path: '/api/socket', // Must match the path set on the server
});

export default socket;