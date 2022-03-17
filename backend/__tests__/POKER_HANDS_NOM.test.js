const app = require('../src/app.js');

describe('POKER_HANDS_NOM', () => {
  it('White wins. - with high card', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/game',
      payload: {
        black: ['2H', '3D', '5S', '9C', 'KD'],
        white: ['2C', '3H', '4S', '8C', 'AH']
      }
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toStrictEqual({
      winner: 'white',
      hand: 'High Card'
    });
  });

  it('Black wins. - with full house', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/game',
      payload: {
        black: ['2H', '4S', '4C', '2D', '4H'],
        white: ['2S', '8S', 'AS', 'QS', '3S']
      }
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toStrictEqual({
      winner: 'black',
      hand: 'Full House'
    });
  });

  it('Black wins. - with high card', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/game',
      payload: {
        black: ['2H', '3D', '5S', '9C', 'KD'],
        white: ['2C', '3H', '4S', '8C', 'KH']
      }
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toStrictEqual({
      winner: 'black',
      hand: 'High Card'
    });
  });

  it('Tie.', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/game',
      payload: {
        black: ['2H', '3D', '5S', '9C', 'KD'],
        white: ['2D', '3H', '5C', '9S', 'KH']
      }
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toStrictEqual({
      winner: 'Tie',
      hand: null
    });
  });

  it('Black wins. - with Pair', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/game',
      payload: {
        black: ['3H', '3D', '5S', '9C', 'KD'],
        white: ['2C', '3H', '4S', '8C', 'KH']
      }
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toStrictEqual({
      winner: 'black',
      hand: 'Pair'
    });
  });

  it('White wins. - with Two Pairs', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/game',
      payload: {
        black: ['3H', '3D', '5S', '9C', 'KD'],
        white: ['4C', '4H', '8S', '8C', 'KH']
      }
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toStrictEqual({
      winner: 'white',
      hand: 'Two Pairs'
    });
  });

  it('Black wins. - with Three of a Kind', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/game',
      payload: {
        black: ['9H', '3D', '9S', '9C', 'KD'],
        white: ['2C', '3H', '4S', '8C', 'KH']
      }
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toStrictEqual({
      winner: 'black',
      hand: 'Three of a Kind'
    });
  });

  it('White wins. - with Two Straight', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/game',
      payload: {
        black: ['3H', '3D', '5S', '9C', 'KD'],
        white: ['4C', '5H', '6S', '7C', '8H']
      }
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toStrictEqual({
      winner: 'white',
      hand: 'Straight'
    });
  });

  it('Black wins. - with Flush', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/game',
      payload: {
        black: ['9H', '3H', '9H', '9H', 'KH'],
        white: ['2C', '3H', '4S', '8C', 'KH']
      }
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toStrictEqual({
      winner: 'black',
      hand: 'Flush'
    });
  });

  it('White wins. - with Four of a kind', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/game',
      payload: {
        black: ['3H', '3D', '5S', '9C', 'KD'],
        white: ['4D', '4H', '4S', '4C', '7H']
      }
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toStrictEqual({
      winner: 'white',
      hand: 'Four of a kind'
    });
  });

  it('Black wins. - with Straight flush', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/game',
      payload: {
        black: ['10H', 'JH', 'QH', 'KH', 'AH'],
        white: ['2C', '3H', '4S', '8C', 'KH']
      }
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toStrictEqual({
      winner: 'black',
      hand: 'Straight flush'
    });
  });
});
