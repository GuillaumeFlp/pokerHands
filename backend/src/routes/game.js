const path = require('path');
const logger = require('../logger');
const PokerHands = require('../lib/pokerHands');
const User = require('../lib/users');
const fileName = path.basename(__filename);

async function routes(fastify) {
  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      body: {
        type: 'object',
        properties: {
          black: {
            type: 'array',
            maxItems: 5,
            items: { type: 'string' }
          },
          white: {
            type: 'array',
            maxItems: 5,
            items: { type: 'string' }
          }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            winner: {
              type: 'string'
            },
            hand: {
              type: 'string',
              nullable: true
            }
          }
        }
      }
    },
    handler: (request, reply) => {
      const { method, url, body } = request;

      logger.http({
        fileNameLabel: fileName,
        message: `${method} on ${url} with body: ${JSON.stringify(body)}`
      });

      const blackFormatedHand = PokerHands.getFormatedHand(body.black);
      const whiteFormatedHand = PokerHands.getFormatedHand(body.white);

      if (
        !blackFormatedHand ||
        blackFormatedHand.length != 5 ||
        !whiteFormatedHand ||
        whiteFormatedHand.length != 5
      ) {
        reply.code(500).send();
      }

      const result = PokerHands.compareHands(
        blackFormatedHand,
        whiteFormatedHand
      );

      fastify.io.emit('result', result);

      reply.code(200).send(result);
    }
  });

  fastify.route({
    method: 'GET',
    url: '/cards',
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
      },
      response: {
        200: {
          type: 'array',
          maxItems: 5,
          items: { type: 'string' }
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

      const hand = PokerHands.getHand();
      User.setHand(query.username, hand);

      fastify.io.emit('users_logged', User.getUsersLogged());

      reply.code(200).send(hand);
    }
  });
}

module.exports = routes;
