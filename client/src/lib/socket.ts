// Our proposed architecture would be:

// socket.ts — creates the shared Socket.IO instance.

// usePollSocket.ts — subscribes to socket events and updates the TanStack Query cache.

// usePoll.ts — fetches and reads poll data from TanStack Query.

// Parent component — initializes the socket subscription once.

// Child components — call usePoll() whenever they need poll data.

import { io } from "socket.io-client";
const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`);

export default socket;
