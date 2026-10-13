"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";

export default function SocketTest() {
  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on("connect", () => {
      console.log("Connected:", socket.id);

      socket.emit("message", "Hello from client!");
    });

    socket.on("reply", (data) => {
      console.log("Message from server:", data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <h1>Socket.IO Test</h1>;
}
