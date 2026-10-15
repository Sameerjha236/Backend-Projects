"use client";

import { useEffect, useState } from "react";
import { useSocket } from "@/hooks/useSocket";

export default function SocketTest() {
  const socket = useSocket();
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const handleUpdatedCount = (newCount: number) => {
      setCount(newCount);
    };

    socket.on("updatedCount", handleUpdatedCount);

    // Request the initial count
    if (socket.connected) {
      socket.emit("getCount");
    } else {
      socket.once("connect", () => {
        socket.emit("getCount");
      });
    }

    return () => {
      socket.off("updatedCount", handleUpdatedCount);
      socket.off("connect");
    };
  }, [socket]);

  const handleClick = () => {
    socket.emit("increaseCount");
  };

  return (
    <div>
      <h1>Socket Test</h1>

      <h2>Count: {count ?? "Loading..."}</h2>

      <button onClick={handleClick}>Increase Count</button>
    </div>
  );
}
