import { io } from "socket.io-client";
export const Socket = () => io("http://localhost:3001");