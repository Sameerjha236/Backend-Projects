import "dotenv/config";
import app from "./app";

import { createServer } from "http";
import { Server } from "socket.io";
import { registerSocketHandlers } from "./sockets";

const PORT = 4000;

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

registerSocketHandlers(io);

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
