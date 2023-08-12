import { randomUUID } from "node:crypto";
import db from "../database/mariadb.js";
import { logger } from "../utils/logger.js";
import { hash } from "../utils/hashPassword.js";

export const logup = async (req, res) => {
  const { nickname, password } = req.body;

  let conn;

  try {
    conn = await db.getConnection();

    const idUser = randomUUID();
    const hashPassword = hash(password);

    const ThereIsAlreadyAUserWithThatNickname = await conn.query(
      `SELECT nickname FROM users WHERE nickname=?`,
      [nickname]
    );

    const existingUserNickname = ThereIsAlreadyAUserWithThatNickname[0]?.nickname;
    
    if (existingUserNickname) {
      return res.status(400).json({ error: "Esse nome de usuário ja existe, tente outro" });
    }

    const queryUser = `INSERT INTO users (id, nickname, password) VALUES (?,?,?);`;

    const row = await conn.query(queryUser, [idUser, nickname, hashPassword]);

    console.log(row);

    if (row.affectedRows === 1) {
      res.status(201).json({
        message: "Conta criada com sucesso!",
      });
    }
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
