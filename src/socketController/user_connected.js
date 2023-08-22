import db from "../database/mariadb.js";
import { logger } from "../utils/logger.js";

export const user_connected = async (data, socket) => {
  let conn;

  try {
    conn = await db.getConnection();

    await conn.query(
      `INSERT INTO socket_user_mapping 
      (user_id, socket_id) VALUES (?, ?) 
      ON DUPLICATE KEY UPDATE socket_id = ?`,
      [data.id, socket.id, socket.id]
    );

    const existingUser = await conn.query("SELECT * FROM users WHERE id=?", [
      data.id,
    ]);
    if (existingUser[0]?.nickname) {
      logger.info(`${JSON.stringify(data.nickname)} se conectou.`);
    }
  } catch (error) {
    logger.log(`Error: ${error}`);
  } finally {
    if (conn) {
      conn.release();
    }
  }
};
