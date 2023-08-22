import { logger } from "../utils/logger.js";
import db from "../database/mariadb.js";

export const socket_disconnect = async (socket) => {
  logger.warn(`[ SOCKET 👤] -> socket desconectado: ${socket.id}`);
};
