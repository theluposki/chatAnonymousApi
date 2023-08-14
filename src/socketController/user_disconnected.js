import { logger } from "../utils/logger.js";

export const user_disconnected = (data) => {
  logger.warn(`${data.user} desconectou.`);
}
