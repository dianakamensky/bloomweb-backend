const winston = require("winston");
const expressWinston = require("express-winston");

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: "request.log" }),
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true,
  level: "debug"
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: "error.log" }),
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true,
  level: "debug"
});

module.exports = {
  requestLogger,
  errorLogger,
};
