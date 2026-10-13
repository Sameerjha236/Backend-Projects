import type { Server } from "socket.io";
import { registerMessageHandlers } from "./message/message.controller";

export function registerSocketHandlers(io: Server) {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    registerMessageHandlers(socket);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}
