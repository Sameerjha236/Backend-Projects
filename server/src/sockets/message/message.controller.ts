import type { Socket } from "socket.io";
import { getCount, getNextCount, processMessage } from "./message.service";
import type { Server } from "socket.io";

export function registerMessageHandlers(io: Server, socket: Socket) {
  // Existing message handler
  socket.on("message", (data: string) => {
    const reply = processMessage(data);
    socket.emit("reply", reply);
  });

  // Send initial count when requested
  socket.on("getCount", () => {
    socket.emit("updatedCount", getCount());
  });

  // Increment count and return the new value
  socket.on("increaseCount", () => {
    const count = getNextCount();
    io.emit("updatedCount", count);
  });
}
