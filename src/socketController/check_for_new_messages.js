import db from "../database/mariadb.js";
import { logger } from "../utils/logger.js";

export const check_for_new_messages = async (data, socket, io) => {
  const { userId, friendId } = data
  
  let conn;

  try {
    conn = await db.getConnection();

    const conversations = await conn.query(
      `SELECT * FROM conversations 
           WHERE sender=? AND receiver=?`,
      [friendId, userId]
    );
    
    if(conversations.length > 0) {
      socket.emit("have_new_messages", conversations);
    }
  } catch (error) {
    logger.info(`Error ${error}`);
  } finally {
    if (conn) {
      conn.release();
    }
  }
}
