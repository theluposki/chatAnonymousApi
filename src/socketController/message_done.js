import db from "../database/mariadb.js";
import { logger } from "../utils/logger.js";

export const message_done = async (data, socket, io) => {
  let conn;

  console.log("message_done ---", data);
  // uuidMessage
  try {
    conn = await db.getConnection();

    const message = await conn.query(
      "SELECT * FROM conversations WHERE id=?;",
      [data.serverID]
    );

    console.log("sender: ", message[0].sender);

    const row = await conn.query("DELETE FROM conversations WHERE id=?;", [
      data.serverID,
    ]);

    if (row.affectedRows === 1) {
      const socketFriends = await conn.query(
        "select * from socket_user_mapping WHERE user_id =?;",
        [message[0].sender]
      );

      console.log(socketFriends[0])
      io.to(socketFriends[0].socket_id).emit("done", {
        uuidMessage: message[0].uuidMessage,
      });
      logger.info("messages delete");
    }
  } catch (error) {
    logger.info(`Error ${error}`);
  } finally {
    if (conn) {
      conn.release();
    }
  }
};
