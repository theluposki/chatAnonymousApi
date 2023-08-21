import mariadb from "mariadb";
import config from "../config.js";
import { createTables } from "./createTables.js";
import { logger } from "../utils/logger.js";

const pool = mariadb.createPool(config.mariadbConfig);

export async function connectToDatabase() {
  try {
    const conn = await pool.getConnection();
    logger.info("[ DB ] Connection successfully established.");
    await createTables(pool);
    conn.end();
  } catch (err) {
    logger.error(`[ DB ] Error connecting to database: ${err}`);
  }
}


export default pool;
