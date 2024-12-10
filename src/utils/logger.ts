import { LoggerStatus } from "../constants/logger-status.enum.js";

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",

  fg: {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
  },

  bg: {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
  },
};

const logger = (level: LoggerStatus, message: string) => {
  switch (level) {
    case LoggerStatus.INFO:
      console.log(`${colors.fg.green}%s${colors.reset}`, `INFO: ${message}`);
      break;
    case LoggerStatus.ERROR:
      console.log(`${colors.fg.red}%s${colors.reset}`, `ERROR: ${message}`);
      break;
    case LoggerStatus.WARN:
      console.log(`${colors.fg.yellow}%s${colors.dim}`, `WARN: ${message}`);
      break;
    default:
      console.log(`${colors.fg.cyan}%s${colors.dim}`, `LOG: ${message}`);
  }
};

export default logger;
