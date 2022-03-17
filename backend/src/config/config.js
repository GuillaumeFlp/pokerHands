module.exports = {
  server: {
    address: '0.0.0.0',
    port: 8080
  },
  publicDirectory: '/frontend',
  logger: {
    silent: false,
    level: 'debug',
    rotationFrequency: '24h',
    fileName: 'poker_hands_%DATE%',
    fileExtension: '.log',
    directoryName: './logs',
    maxFileSize: '2m',
    maxStorageTime: '7d'
  }
};
