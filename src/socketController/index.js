import { logger } from "../utils/logger.js";

import { user_connected } from "./user_connected.js";
import { user_disconnected } from "./user_disconnected.js";
import { send_message } from "./send_message.js";
import { is_typing } from "./is_typing.js";
import { stopped_typing } from "./stopped_typing.js"
import { message_done } from "./message_done.js";
import { check_for_new_messages } from "./check_for_new_messages.js";
import { socket_disconnect } from "./socket_disconnect.js";

export const connection = (socket, io) => {
  logger.info(`[ SOCKET 👤] -> novo socket conectado: ${socket.id}`);

  socket.on("user_connected", async (data) => await user_connected(data, socket));
  socket.on("user_disconnected", (data) => user_disconnected(data));
  socket.on("send_message", async (data) => await send_message(data, socket, io));
  socket.on("is_typing", async (data) => await is_typing(data, socket, io))
  socket.on("stopped_typing", async (data) => await stopped_typing(data, socket, io))
  socket.on("message_done", async (data) => await message_done(data, socket, io))
  socket.on("check_for_new_messages", async (data) => await check_for_new_messages(data, socket, io))
  socket.on("disconnect", async () => await socket_disconnect(socket));
}
