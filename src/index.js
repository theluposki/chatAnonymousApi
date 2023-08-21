import { createServer } from "node:http";
import { app } from "./app.js";
import { logger } from "./utils/logger.js";
import config from "./config.js";
import { IO } from "./socket.io.js";
import cluster from "node:cluster"
import { cpus } from "node:os"
import { connectToDatabase } from "./database/mariadb.js"

const server = createServer(app);

IO(server);

if (cluster.isPrimary) {
  const numCpu = cpus().length + 2
  await connectToDatabase()
  logger.info(`\n\nPrimary process -> pid: ${process.pid} is running -> \n\n⚙️ -Listening at 🚀 https://127.0.0.1:${config.app.PORT} 🚀\n`);
  logger.info(`Primary cluster setting up ${numCpu} workers...\n`)

  for (let i = 0; i < numCpu; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    logger.info(`\n[ Worker ⚙️ ${worker.process.pid}] died with code: ${code}, and signal: ${signal}`);
    logger.info('\nStarting a new worker - ⚙️\n');
    cluster.fork();
  });

} else {
  server.listen(config.app.PORT, () => {
    logger.info(
      `[ Worker ⚙️ ] -> pid: ${process.pid} 🚀 -`)
  });
}
