const path = require('path');
const logger = require('../logger');
const fileName = path.basename(__filename);
const Users = require('../lib/users');

async function routes(fastify) {
  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      schema: {
        querystring: {
          type: 'object',
          required: ['username'],
          properties: {
            username: {
              type: 'string'
            }
          }
        }
      }
    },
    handler: (request, reply) => {
      const { method, url, query } = request;

      logger.http({
        fileNameLabel: fileName,
        message: `${method} on ${url} with querystring: ${JSON.stringify(
          query
        )}`
      });

      Users.add(query.username);
      fastify.io.emit('users_logged', Users.getUsersLogged());

      reply.code(200).send();
    }
  });
}

module.exports = routes;
