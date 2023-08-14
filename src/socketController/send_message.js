import db from "../database/mariadb.js";
import { randomUUID } from "node:crypto";
import { logger } from "../utils/logger.js";

export const send_message = async (data, socket, io) => {
  logger.info(`data: ${JSON.stringify(data)}`);
  logger.info(`socket: ${JSON.stringify(socket.id)}`);


  const { senderNickname, sender, receiverNickname, receiver, message } = data;

  let conn;

  try {
    conn = await db.getConnection();

    const id = randomUUID();

    const existingSender = await conn.query("SELECT * FROM users WHERE id=?", [
      sender,
    ]);

    const existingReceiver = await conn.query(
      "SELECT * FROM users WHERE id=?",
      [receiver]
    );

    if (!existingSender[0]?.nickname || !existingReceiver[0]?.nickname) {
      return console.log("Não foi possivel enviar a mensagem");
    }

    const querySendMessage = `
          INSERT INTO conversations 
          (id,senderNickname,sender,receiverNickname,receiver, message) 
          VALUES (?,?,?,?,?,?);
    `;

    const row = await conn.query(querySendMessage, [
      id,
      senderNickname,
      sender,
      receiverNickname,
      receiver,
      message,
    ]);

    if (row.affectedRows === 1) {
      const socketFriends = await conn.query("select * from socket_user_mapping WHERE user_id =?;", [receiver]);

      io.to(socketFriends[0].socket_id).emit('newMessage', {
        serverID: id,
        senderNickname,
        sender,
        receiverNickname,
        receiver,
        message,
      });
    }
  } catch (error) {
    logger.error(`ERROR: ${error}`);
  } finally {
    if (conn) {
      conn.release();
    }
  }
};
