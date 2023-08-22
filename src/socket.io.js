import { Server } from "socket.io";
import config from "./config.js";
import { connection } from "./socketController/index.js";

export const IO = (server) => {
  const io = new Server(server, config.websocket);

  io.on("connection", async (socket) => {
    connection(socket, io)
  });
};
