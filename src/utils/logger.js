import pino from "pino";
import pretty from "pino-pretty";

export const logger = pino(
  pretty({
    colorize: true,
    colorizeObjects: true,
    ignore: 'pid,hostname',
  })
);
