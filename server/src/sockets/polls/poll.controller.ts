import type { Socket, Server } from "socket.io";
import { getCurrentTeam, updateVote } from "./polls.service";

export function registerPollHandlers(io: Server, socket: Socket) {
  socket.on("voteTeam", (id: string) => {
    const success = updateVote(id);

    if (!success) return;

    io.emit("UpdatedTeamData", getCurrentTeam());
  });

  socket.on("getTeam", () => {
    socket.emit("teamData", getCurrentTeam());
  });
}
