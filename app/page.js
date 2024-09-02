"use client"; // Menandai file ini sebagai Client Component

import { useEffect, useState } from "react";
import socket from "../lib/socket"; // Import instance socket.io client

export default function Home() {
  const [message, setMessage] = useState(""); // State untuk pesan yang ingin dikirim
  const [serverMessage, setServerMessage] = useState(""); // State untuk pesan yang diterima dari server
  const [room, setRoom] = useState(""); // State untuk nama ruangan

  useEffect(() => {
    // Event handler untuk menerima pesan dari server
    socket.on("message", (data) => {
      console.log("Message from server:", data);
      setServerMessage(data); // Set pesan yang diterima dari server
    });

    // Cleanup untuk menonaktifkan listener saat komponen dihapus
    return () => {
      socket.off("message");
    };
  }, []); // Efek ini hanya dijalankan sekali setelah render pertama

  const joinRoom = () => {
    if (room.trim()) {
      socket.emit("join_room", room);
    } else {
      alert("Room name cannot be empty.");
    }
  };

  const leaveRoom = () => {
    if (room.trim()) {
      socket.emit("leave_room", room);
    } else {
      alert("Room name cannot be empty.");
    }
  };

  const sendMessage = () => {
    if (room.trim() && message.trim()) {
      socket.emit("send_message", room, message); // Mengirim pesan dari input
      setMessage(""); // Mengosongkan input pesan setelah dikirim
    } else {
      alert("Room name and message cannot be empty.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Socket.IO with Next.js</h1>
      <div style={styles.formContainer}>
        <input
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Enter room name"
          style={styles.input}
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          style={styles.input}
        />
        <button onClick={joinRoom} style={styles.button}>Join Room</button>
        <button onClick={leaveRoom} style={styles.button}>Leave Room</button>
        <button onClick={sendMessage} style={styles.button}>Send Message</button>
      </div>
      <p style={styles.message}>
        <strong>Message from server:</strong> {serverMessage}
      </p>
    </div>
  );
}

// Styling object
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '0 20px',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    width: '300px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#0070f3',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#005bb5',
  },
  message: {
    marginTop: '20px',
    fontSize: '1.2rem',
    color: '#333',
  },
};
