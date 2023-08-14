import db from "../database/mariadb.js";

export const message_done = async (data, socket, io) => {
  let conn;

  try {
    conn = await db.getConnection();

    const row = await conn.query("DELETE FROM conversations WHERE id=?;", [
      data,
    ]);

    console.log(data)
    console.log(row)
    if(row.affectedRows === 1) {
      console.log("messages delete");
    }
  } catch (error) {
    console.log(`Error ${error}`);
  } finally {
    if (conn) {
      conn.release();
    }
  }
};
