import type { Server } from "socket.io";
import { registerMessageHandlers } from "./message/message.controller";
import { registerPollHandlers } from "./polls/poll.controller";

export function registerSocketHandlers(io: Server) {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    registerMessageHandlers(io, socket);

    registerPollHandlers(io, socket);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}
