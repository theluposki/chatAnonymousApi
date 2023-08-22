import mariadb from "mariadb";
import config from "../config.js";
import { createTables } from "./createTables.js";
import { logger } from "../utils/logger.js";

const pool = mariadb.createPool(config.mariadbConfig);

export async function connectToDatabase() {
  let conn;

  try {
    conn = await pool.getConnection();
    logger.info("[ DB 🗄️] Connection successfully established.");
    await createTables(conn);
  } catch (err) {
    logger.error(`[ DB 🗄️] Error connecting to database: ${err}`);
  } finally {
    if (conn) {
      conn.release();
    }
  }
}

export default pool;
