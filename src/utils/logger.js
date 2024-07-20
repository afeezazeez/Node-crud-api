require('dotenv').config();
const { createLogger, format, transports, addColors } = require('winston');
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

// Define colors for different log levels
const customColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue'
};

addColors(customColors);

// Define log formats
const consoleFormat = combine(
  colorize(), // Apply colorization to all messages
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  printf(({ level, message, timestamp, stack }) => {
    return stack
      ? `${timestamp} ${level}: ${message}\n${stack}`
      : `${timestamp} ${level}: ${message}`;
  })
);

const fileFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  printf(({ level, message, timestamp, stack }) => {
    return stack
      ? `${timestamp} ${level}: ${message}\n${stack}`
      : `${timestamp} ${level}: ${message}`;
  })
);

// Create the logger
const logger = createLogger({
  level: 'info',
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  },
  format: fileFormat, // Default format for all transports
  transports: [
    new transports.Console({
      format: consoleFormat
    }),
    new DailyRotateFile({
      filename: path.join(logDir, 'application-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

module.exports = logger;
