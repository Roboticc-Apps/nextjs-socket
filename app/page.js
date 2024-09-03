"use client"; // Marking this file as a Client Component

import { useEffect, useState } from "react";
import socket from "../lib/socket"; // Import Socket.IO client instance

export default function Home() {
  const [message, setMessage] = useState(""); // State to store the message to be sent
  const [serverMessage, setServerMessage] = useState(""); // State to store the message received from the server

  useEffect(() => {
    // Event handler to receive messages from the server
    socket.on("message", (data) => {
      console.log("Received message from server:", data);
      setServerMessage(data); // Set the received message to state
    });

    // Log socket connection status
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    // Cleanup to remove listener when component is unmounted
    return () => {
      console.log("Cleaning up listeners...");
      socket.off("message");
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
    };
  }, []); // This effect runs only once after the first render

  const sendMessage = () => {
    if (message.trim()) {
      console.log("Sending message to server:", message);
      socket.emit("message", message); // Send message to server
      setMessage(""); // Clear the message input after sending
    } else {
      alert("Message cannot be empty.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Socket.IO with Next.js</h1>
      <div style={styles.formContainer}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send Message
        </button>
      </div>
      <div style={styles.messageContainer}>
        <p style={styles.messageHeader}>
          <strong>Message from server:</strong>
        </p>
        <div style={styles.messageContent}>
          {serverMessage || "No message received yet"}
        </div>
      </div>
    </div>
  );
}

// Styling object
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "0 20px",
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#333",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ddd",
    width: "300px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#0070f3",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#005bb5",
  },
  messageContainer: {
    maxWidth: "100%", // Ensure the container doesn't exceed the width of its parent
    overflowX: "auto", // Allow horizontal scrolling if content overflows
    overflowY: "auto", // Allow vertical scrolling if content overflows
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center", // Center align text horizontally
  },
  messageHeader: {
    fontSize: "1.2rem",
    color: "#333",
    marginBottom: "10px",
  },
  messageContent: {
    whiteSpace: "pre-wrap", // Preserve whitespace and line breaks
    wordWrap: "break-word", // Break long words to prevent overflow
    fontSize: "1rem",
    color: "#333",
    textAlign: "center", // Center align text horizontally
  },
};
