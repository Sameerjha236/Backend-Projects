import type { Socket } from "socket.io";
import { processMessage } from "./message.service";

export function registerMessageHandlers(socket: Socket) {
  socket.on("message", (data: string) => {
    console.log("Message from client:", data);

    const reply = processMessage(data);

    socket.emit("reply", reply);
  });
}
