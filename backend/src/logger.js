const path = require('path');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const config = require('./config/config.js');

const fileName = path.basename(__filename);

const logFormat = winston.format.printf(
  ({ fileNameLabel, level, message, timestamp }) =>
    `[${timestamp}] [${level}] [${fileNameLabel}] ${message}`
);

const rotateTransports = new DailyRotateFile({
  frequency: config.logger.rotationFrequency,
  datePattern: 'DD-MM-YYYY',
  zippedArchive: true,
  filename: config.logger.fileName,
  extension: config.logger.fileExtension,
  dirname: config.logger.directoryName,
  maxSize: config.logger.maxFileSize,
  maxFiles: config.logger.maxStorageTime,
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    logFormat
  )
});

const consoleTransports = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    winston.format.colorize(),
    logFormat
  )
});

const logger = winston.createLogger({
  level: config.logger.level,
  silent: config.logger.silent,
  exitOnError: false,
  handleExceptions: true,
  transports: [consoleTransports, rotateTransports],
  exceptionHandlers: [consoleTransports, rotateTransports]
});

rotateTransports.on('new', (newFileName) => {
  logger.debug({
    fileNameLabel: fileName,
    message: `Logger event: 'new file' - newFileName: ${newFileName}`
  });
});

rotateTransports.on('rotate', (oldFileName, newFileName) => {
  logger.debug({
    fileNameLabel: fileName,
    message: `Logger event: 'rotated files' - oldFileName: ${oldFileName} - newFileName: ${newFileName}`
  });
});

rotateTransports.on('archive', (zipFilename) => {
  logger.debug({
    fileNameLabel: fileName,
    message: `Logger event: 'zipped file' - zipFilename: ${zipFilename}`
  });
});

rotateTransports.on('logRemoved', (removedFilename) => {
  logger.debug({
    fileNameLabel: fileName,
    message: `Logger event: 'removed file' - removedFilename: ${removedFilename}`
  });
});

module.exports = logger;
