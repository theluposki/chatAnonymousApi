import { Server } from "socket.io";
import { logger } from "./utils/logger.js";
import config from "./config.js";
import db from "./database/mariadb.js";
import { user_connected } from "./socketController/user_connected.js";
import { user_disconnected } from "./socketController/user_disconnected.js";
import { send_message } from "./socketController/send_message.js";
import { is_typing } from "./socketController/is_typing.js";
import { stopped_typing } from "./socketController/stopped_typing.js"
import { message_done } from "./socketController/message_done.js";
import { check_for_new_messages } from "./socketController/check_for_new_messages.js";

export const IO = (server) => {
  const io = new Server(server, config.websocket);

  io.on("connection", async (socket) => {
    await db.getConnection();

    logger.info(`novo socket conectado: ${socket.id}`);

    socket.on(
      "user_connected",
      async (data) => await user_connected(data, socket)
    );
    socket.on("user_disconnected", (data) => user_disconnected(data));
    socket.on("send_message", async (data) => await send_message(data, socket, io));
    socket.on("is_typing", async (data) => await is_typing(data, socket, io))
    socket.on("stopped_typing", async (data) => await stopped_typing(data, socket, io))
    socket.on("message_done", async (data) => await message_done(data))
    socket.on("check_for_new_messages", async (data) => await check_for_new_messages(data, socket, io))


    socket.on("disconnect", async () => {
      logger.warn(`socket desconectado: ${socket.id}`);

      let conn;

      try {
        conn = await db.getConnection();

        // Remova a associação ao desconectar
        await conn.query(
          "DELETE FROM socket_user_mapping WHERE socket_id = ?",
          [socket.id]
        );
      } catch (error) {
        console.error("Erro ao remover associação: ", error);
      } finally {
        if (conn) {
          conn.release();
        }
      }
    });
  });
};
