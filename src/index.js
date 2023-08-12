import { createServer } from "node:http";
import { app } from "./app.js";
import { logger } from "./utils/logger.js";
import config from "./config.js";
import { IO } from "./socket.io.js";

const server = createServer(app);

IO(server);

server.listen(config.app.PORT, () => {
  const { port } = server.address();
  logger.info(`app listening http://localhost:${port}`);
});
