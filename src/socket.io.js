import { Server } from "socket.io";
import { logger } from "./utils/logger.js";
import config from "./config.js";

export const IO = (server) => {
  const io = new Server(server, config.websocket);
  io.on("connection", async (socket) => {
    logger.info(`novo socket conectado: ${socket.id}`);

    socket.on("user_connected", (data) => {
      logger.info(`${data.user} se conectou.`);
    });

    socket.on("user_disconnected", (data) => {
      logger.warn(`${data.user} desconectou.`);
    });

    socket.on("disconnect", async () => {
      logger.warn(`socket desconectado: ${socket.id}`);
    });
  });
};
