import { createLogger, transports, format } from 'winston';
const path = require('path');
import { loggerLevel } from './config'

const resultTransports = [
  new transports.Console({
    format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.printf(info => {
        const {timestamp, level, message, ...args} = info;

        const ts = timestamp.slice(0, 19).replace('T', ' ');

        return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
      })
    )
  }),
  new transports.File({filename: '.log', dirname: path.resolve(__dirname)})
];

const logger = createLogger({
  transports: resultTransports,
  level: loggerLevel,
  exitOnError: false
});

export default module.exports = {
  log: (...args: any[]) => {
    logger.info(args.join(' '));
  },
  info: (...args: any[]) => {
    logger.info(args.join(' '));
  },
  debug: (...args: any[]) => {
    logger.debug(args.join(' '));
  },
  warn: (...args: any[]) => {
    logger.warn(args.join(' '));
  },
  error: (...args: any[]) => {
    logger.error(args.join(' '));
  }
};

