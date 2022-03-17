const path = require('path');
const fastify = require('fastify');
const config = require('./config/config');
const logger = require('./logger');

const fileName = path.basename(__filename);

const server = fastify({});

process.on('uncaughtException', (error) => {
  logger.error({
    fileNameLabel: fileName,
    message: error.message
  });
});

server.register(require('fastify-cors'), {
  origin: '*',
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type']
});
server.register(require('fastify-socket.io'), {
  cors: {
    origin: '*'
  }
});
console.log(path.join(__dirname, config.publicDirectory));
server.register(require('fastify-static'), {
  root: path.join(__dirname, config.publicDirectory),
  prefixAvoidTrailingSlash: true
});
server.setNotFoundHandler((req, res) => {
  res.sendFile('index.html');
});
server.register(require('./routes/game'), { prefix: '/api/v1/game' });
server.register(require('./routes/auth'), { prefix: '/api/v1/auth' });

server.listen(config.server.port, config.server.address, (error, address) => {
  if (error) {
    logger.error({
      fileNameLabel: fileName,
      message: error.message
    });
    process.exit(1);
  } else {
    logger.info({
      fileNameLabel: fileName,
      message: `Poker Hands server is now listening on ${address}`
    });
  }
});

module.exports = server;
