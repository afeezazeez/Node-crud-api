require('dotenv').config();
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize, errors } = format;
const DailyRotateFile = require('winston-daily-rotate-file');
const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logDir = path.join(__dirname, '../logs');
ensureDirectoryExistence(logDir);

// Helper function to ensure the logs directory exists
function ensureDirectoryExistence(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Custom format to include the line number
const addLineNumber = format((info) => {
  if (info.stack) {
    const stack = info.stack.split('\n');
    
    let relevantStackLine;
    for (let i = 2; i < stack.length; i++) {
      const line = stack[i].trim();
      if (!line.includes('node:internal') && !line.includes('node:events')) {
        relevantStackLine = line;
        break;
      }
    }
    
    if (relevantStackLine) {
      const matches = relevantStackLine.match(/at\s+(.*)\s+\((.*):(\d+):(\d+)\)/) || relevantStackLine.match(/at\s+(.*):(\d+):(\d+)/);
      if (matches) {
        info.filename = matches[2] || matches[1];
        info.lineNumber = matches[3];
      } else {
        info.filename = 'unknown';
        info.lineNumber = 'unknown';
      }
    }
  }
  return info;
});

// Define log formats
const consoleFormat = combine(
  errors({ stack: true }),
  colorize(),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  addLineNumber(),
  printf(({ level, message, timestamp, filename, lineNumber, stack }) => {
    return `${timestamp} ${level}: ${message} in [${filename} on line ${lineNumber}]${stack ? `\n${stack}` : ''}`;
  })
);

const fileFormat = combine(
  errors({ stack: true }),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  addLineNumber(),
  printf(({ level, message, timestamp, filename, lineNumber, stack }) => {
    return `${timestamp} ${level}: ${message} in [${filename} on line ${lineNumber}]${stack ? `\n${stack}` : ''}`;
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

module.exports = logger;
