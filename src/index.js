import { createServer } from "node:http";
import { app } from "./app.js";
import { logger } from "./utils/logger.js";
import config from "./config.js";
import { IO } from "./socket.io.js";
import { connectToDatabase } from "./database/mariadb.js";

const server = createServer(app);

IO(server);

await connectToDatabase();

server.listen(config.app.PORT, () => {
  logger.info(`[ SERVER ⚙️ ] -> pid: ${process.pid} 🚀 -`);
});
