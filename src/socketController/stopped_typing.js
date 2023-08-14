import db from "../database/mariadb.js";

export const stopped_typing = async (data, socket, io) => {
  let conn;

  try {
    conn = await db.getConnection();

    const socketFriends = await conn.query("select * from socket_user_mapping WHERE user_id =?;", [data.friendId]);

      io.to(socketFriends[0].socket_id).emit('friend_is_typing', {
        message: ""
      });

  } catch (error) {
    console.log(`Error ${error}`);
  } finally {
    if (conn) {
      conn.release();
    }
  }
}
