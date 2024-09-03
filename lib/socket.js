// lib/socket.js

import { io } from 'socket.io-client';

// Use relative URL to connect to the same host where the client code is hosted
const socket = io({
  path: '/api/socket', // Ensure this matches the path set on the server
});

export default socket;