require('dotenv').config();
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;
const DailyRotateFile = require('winston-daily-rotate-file');
const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logDir = path.join(__dirname, '../logs');
ensureDirectoryExistence(logDir);

// Custom format to include the line number
const addLineNumber = format((info) => {
  const err = new Error();
  const stack = err.stack.split('\n');
  const relevantStackLine = stack[10].trim(); // Adjust based on the call stack depth
  const matches = relevantStackLine.match(/at\s+(.*)\s+\((.*):(\d+):(\d+)\)/) || relevantStackLine.match(/at\s+(.*):(\d+):(\d+)/);

  if (matches) {
    info.filename = matches[2] || matches[1];
    info.lineNumber = matches[3];
  }
  return info;
});

// Define log formats
const consoleFormat = combine(
  colorize(),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  addLineNumber(),
  printf(({ level, message, timestamp, filename, lineNumber }) => {
    return `${timestamp} ${level}: ${message} in [${filename} on line ${lineNumber}]`;
  })
);

const fileFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  addLineNumber(),
  printf(({ level, message, timestamp, filename, lineNumber }) => {
    return `${timestamp} ${level}: ${message} in [${filename} on line ${lineNumber}]`;
  })
);

// Create the logger
const logger = createLogger({
  level: 'info',
  transports: [
    new transports.Console({
      format: consoleFormat
    }),
    new DailyRotateFile({
      filename: path.join(logDir, 'application-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      format: fileFormat
    })
  ]
});

// Helper function to ensure the logs directory exists
function ensureDirectoryExistence(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

module.exports = logger;
