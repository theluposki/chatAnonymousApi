import db from "../database/mariadb.js";
import { logger } from "../utils/logger.js";
import { compare } from "../utils/hashPassword.js";

export const login = async (req, res) => {
  const { nickname, password } = req.body;

  let conn;

  try {
    conn = await db.getConnection();

    const existingUser = await conn.query(
      "SELECT * FROM users WHERE nickname=?",
      [nickname]
    );

    if (!existingUser[0]?.nickname)
      return { error: "Incorrect nickname or password" };

    if (!compare(password, existingUser[0]?.password))
      return { error: "Incorrect nickname or password" };

    res.status(200).json({
      message: "Successfully authenticated!",
      user: {
        id: existingUser[0].id,
        nickname: existingUser[0].nickname,
        createdAt: existingUser[0].created_at
      }
    });
  } catch (error) {
    logger.error(`ERROR: ${error}`);
    res.status(200).json({
      error: "Erro ao criar conta",
    });
  } finally {
    if (conn) {
      conn.release();
    }
  }
};
