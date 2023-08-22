import { readFile } from "node:fs";
import { logger } from "../utils/logger.js";
const filePath = "./create_tables.sql";

function readSQLFile(filePath) {
  return new Promise((resolve, reject) => {
    readFile(filePath, "utf8", (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

async function executeSQLCommands(connection, sqlCommands) {
  let conn = connection;
  try {
    for (const sqlCommand of sqlCommands) {
      await conn.query(sqlCommand);
    }
    logger.info("[ DB ] Tabelas criadas com sucesso.");
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = error.message;
      logger.error(errorMessage);
    } else {
      logger.error("Ocorreu um erro desconhecido");
    }
  }  finally {
    if (conn) {
      conn.release();
    }
  }
}

async function createTables(connection) {
  try {
    const sqlScript = await readSQLFile(filePath);
    const sqlCommands = sqlScript
      .split(";")
      .map((command) => command.trim())
      .filter((command) => command);
    await executeSQLCommands(connection, sqlCommands);
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = error.message;
      logger.error(errorMessage);
    } else {
      logger.error("Ocorreu um erro desconhecido");
    }
  }
}

export { createTables };
