import db from "../database/mariadb.js";

export const check_for_new_messages = async (data, socket, io) => {
  const { userId, friendId } = data
  console.log("chamou!")
  
  let conn;

  try {
    conn = await db.getConnection();

    const conversations = await conn.query(
      `SELECT * FROM conversations 
           WHERE sender=? AND receiver=? or sender=? AND receiver=?`,
      [userId, friendId, friendId, userId]
    );
    
    if(conversations.length > 0) {
      socket.emit("have_new_messages", conversations);
    }
  } catch (error) {
    console.log(`Error ${error}`);
  } finally {
    if (conn) {
      conn.release();
    }
  }
}
