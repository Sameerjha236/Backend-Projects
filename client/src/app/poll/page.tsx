"use client";

import { useSocket } from "@/hooks/useSocket";
import { useEffect, useState } from "react";

type TeamData = {
  id: string;
  name: string;
  vote: number;
};

const teamColors: Record<string, string> = {
  Mclaren: "#FF8000",
  Redbull: "#3671C6",
  Ferrari: "#E8002D",
};

const Poll = () => {
  const socket = useSocket();
  const [pollTeams, setPollTeams] = useState<TeamData[]>([]);

  useEffect(() => {
    const handlePollData = (pollData: TeamData[]) => {
      setPollTeams(pollData);
    };

    socket.on("teamData", handlePollData);
    socket.on("UpdatedTeamData", handlePollData);

    const handleConnect = () => {
      socket.emit("getTeam");
    };

    if (socket.connected) {
      handleConnect();
    } else {
      socket.on("connect", handleConnect);
    }

    return () => {
      socket.off("teamData", handlePollData);
      socket.off("UpdatedTeamData", handlePollData);
      socket.off("connect", handleConnect);
    };
  }, [socket]);

  const handleVote = (id: string) => {
    socket.emit("voteTeam", id);
  };

  const totalVotes = pollTeams.reduce((sum, team) => sum + team.vote, 0);
  const leadingVote = Math.max(0, ...pollTeams.map((team) => team.vote));

  return (
    <main className="min-h-screen bg-[#0b0b0f] px-4 py-12 text-white sm:px-8">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 border-b border-white/10 pb-7">
          <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-orange-400">
            <span className="h-2 w-2 rounded-full bg-orange-400" />
            Live paddock poll
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            PICK YOUR <span className="text-orange-400">TEAM.</span>
          </h1>

          <p className="mt-3 text-sm text-zinc-400 sm:text-base">
            One grid. Three contenders. Who gets your vote?
          </p>
        </header>

        <section className="mb-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Total votes
            </p>
            <p className="mt-2 text-3xl font-black">{totalVotes}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Current leader
            </p>
            <p className="mt-2 truncate text-2xl font-black">
              {pollTeams.length && leadingVote > 0
                ? pollTeams.find((team) => team.vote === leadingVote)?.name
                : "No leader yet"}
            </p>
          </div>
        </section>

        <section className="space-y-4">
          {pollTeams.length === 0 ? (
            <div className="rounded-2xl border border-white/10 p-8 text-center text-zinc-400">
              Loading the grid...
            </div>
          ) : (
            pollTeams.map((team, index) => {
              const color = teamColors[team.name] ?? "#a1a1aa";
              const percentage =
                totalVotes > 0 ? (team.vote / totalVotes) * 100 : 0;

              return (
                <article
                  key={team.id}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-[#15151c] transition hover:border-white/20"
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-4">
                      <div
                        className="h-14 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: color }}
                      />

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                          Team {String(index + 1).padStart(2, "0")}
                        </p>
                        <h2 className="mt-1 text-2xl font-black sm:text-3xl">
                          {team.name}
                        </h2>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-black tabular-nums">
                          {team.vote}
                        </p>
                        <p className="text-xs text-zinc-500">votes</p>
                      </div>
                    </div>

                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: color,
                        }}
                      />
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-4">
                      <span className="text-sm text-zinc-400">
                        {percentage.toFixed(0)}% of all votes
                      </span>

                      <button
                        onClick={() => handleVote(team.id)}
                        className="rounded-xl px-5 py-2.5 text-sm font-extrabold text-black transition hover:brightness-110 active:scale-95"
                        style={{ backgroundColor: color }}
                      >
                        VOTE TEAM
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </section>

        <footer className="mt-8 text-center text-xs text-zinc-600">
          LIVE RESULTS · POWERED BY SOCKET.IO
        </footer>
      </div>
    </main>
  );
};

export default Poll;
