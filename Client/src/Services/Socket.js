import io from "socket.io-client";

// Connection is already made here
export const socket = io.connect("http://localhost:3001");
