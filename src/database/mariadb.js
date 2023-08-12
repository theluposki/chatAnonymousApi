import mariadb from "mariadb";
import config from "../config.js";
import { createTables } from "./createTables.js";
import { logger } from "../utils/logger.js";

const pool = mariadb.createPool(config.mariadbConfig);

pool
  .getConnection()
  .then((conn) => {
    logger.info("[ DB ] Connection successfully established.");
    conn.end();
  })
  .catch((err) => {
    logger.error(`[ DB ] Error connecting to database: ${err}`);
  });

await createTables(pool);

export default pool;
