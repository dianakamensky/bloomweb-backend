const winston = require("winston");
const expressWinston = require("express-winston");

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: "request.log", level: "debug" }),
    new winston.transports.Console({ level: "debug" }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true,
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: "error.log", level: "debug" }),
    new winston.transports.Console({ level: "debug" }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true,
});

module.exports = {
  requestLogger,
  errorLogger,
};
