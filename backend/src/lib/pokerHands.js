const Utils = require('./utils');

const values = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
  'A'
];
const suits = ['D', 'H', 'S', 'C'];
const possibleHands = [
  { name: 'High Card', value: 0 },
  { name: 'Pair', value: 1 },
  { name: 'Two Pairs', value: 2 },
  { name: 'Three of a Kind', value: 3 },
  { name: 'Straight', value: 4 },
  { name: 'Flush', value: 5 },
  { name: 'Full House', value: 6 },
  { name: 'Four of a kind', value: 7 },
  { name: 'Straight flush', value: 8 }
];

const format = (card) => {
  const result = {
    value: null,
    suit: null
  };

  const value = card.slice(0, -1);

  if (values.includes(value)) {
    result.value = value;
  } else {
    throw new Error();
  }

  const suit = card.substr(card.length - 1);

  if (suits.includes(suit)) {
    result.suit = suit;
  } else {
    throw new Error();
  }

  return result;
};

const sort = (hand) => {
  return hand.sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));
};

const getHandValues = (hand) => hand.map((card) => card.value);

const getOccur = (hand) => {
  const handValue = getHandValues(hand);
  const occurrences = handValue.reduce((acc, curr) => {
    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
  }, {});
  return occurrences;
};

const getNumberOfPairs = (hand) => {
  const occurrences = getOccur(hand);
  const occurrencesValues = Object.values(occurrences);
  let numberOfPairs = 0;

  occurrencesValues.forEach((occurValue) => {
    if (occurValue === 2) {
      numberOfPairs++;
    }
  });

  return numberOfPairs;
};

const isStraightFlush = (hand) => {
  return isFlush(hand) && isStraight(hand);
};

const isFourOfKind = (hand) => {
  const occurrences = getOccur(hand);
  const occurrencesValues = Object.values(occurrences);
  return occurrencesValues.includes(4);
};

const isFullHouse = (hand) => {
  let result = false;
  if (isThreeOfKind(hand)) {
    const occurrences = getOccur(hand);

    if (Object.values(occurrences).includes(2)) {
      result = true;
    }
  }
  return result;
};

const isFlush = (hand) => {
  const handSuits = hand.map((val) => val.suit);
  return handSuits.every((v) => v === handSuits[0]);
};

const isStraight = (hand) => {
  const handValues = hand.map((val) => val.value);
  const handValueString = handValues.join('');
  const valuesString = values.join('');

  return valuesString.includes(handValueString);
};

const isThreeOfKind = (hand) => {
  const occurrences = getOccur(hand);
  const occurrencesValues = Object.values(occurrences);
  return occurrencesValues.includes(3);
};

const isTwoPairs = (hand) => getNumberOfPairs(hand) == 2;

const isPair = (hand) => getNumberOfPairs(hand) == 1;

const replaceHeadByValue = (array) => {
  array.forEach((elem, index) => {
    if (elem === 'J') {
      array[index] = 11;
    } else if (elem === 'Q') {
      array[index] = 12;
    } else if (elem === 'K') {
      array[index] = 13;
    } else if (elem === 'A') {
      array[index] = 14;
    } else {
      array[index] = parseInt(elem);
    }
  });
  return array;
};

const compareHighestCards = (handBlack, handWhite) => {
  const blackValues = getHandValues(handBlack);
  const whiteValues = getHandValues(handWhite);

  const blackValuesFiltered = blackValues.filter(
    (val) => !whiteValues.includes(val)
  );
  const whiteValuesFiltered = whiteValues.filter(
    (val) => !blackValues.includes(val)
  );

  const res = {
    hand: null
  };

  if (!blackValuesFiltered.length || !whiteValuesFiltered.length) {
    res.hand = 'Tie';
    return res;
  }

  const replacedBlackValue = replaceHeadByValue(blackValuesFiltered);
  const replacedWhiteValue = replaceHeadByValue(whiteValuesFiltered);

  if (Math.max(...replacedBlackValue) > Math.max(...replacedWhiteValue)) {
    res.hand = 'black';
  } else if (
    Math.max(...replacedBlackValue) < Math.max(...replacedWhiteValue)
  ) {
    res.hand = 'white';
  }

  return res;
};

const getHandRank = (hand) => {
  let result = null;

  if (isStraightFlush(hand)) {
    result = possibleHands.find(
      (possibleHand) => possibleHand.name === 'Straight flush'
    );
  } else if (isFourOfKind(hand)) {
    result = possibleHands.find(
      (possibleHand) => possibleHand.name === 'Four of a kind'
    );
  } else if (isFullHouse(hand)) {
    result = possibleHands.find(
      (possibleHand) => possibleHand.name === 'Full House'
    );
  } else if (isFlush(hand)) {
    result = possibleHands.find(
      (possibleHand) => possibleHand.name === 'Flush'
    );
  } else if (isStraight(hand)) {
    result = possibleHands.find(
      (possibleHand) => possibleHand.name === 'Straight'
    );
  } else if (isThreeOfKind(hand)) {
    result = possibleHands.find(
      (possibleHand) => possibleHand.name === 'Three of a Kind'
    );
  } else if (isTwoPairs(hand)) {
    result = possibleHands.find(
      (possibleHand) => possibleHand.name === 'Two Pairs'
    );
  } else if (isPair(hand)) {
    result = possibleHands.find((possibleHand) => possibleHand.name === 'Pair');
  } else {
    result = possibleHands.find(
      (possibleHand) => possibleHand.name === 'High Card'
    );
  }

  return result;
};

module.exports = {
  getFormatedHand: (hand) => {
    const handFormated = hand.map((card) => format(card));
    return sort(handFormated);
  },
  compareHands: (handBlack, handWhite) => {
    const rankBlack = { ...getHandRank(handBlack) };
    const rankWhite = { ...getHandRank(handWhite) };

    const res = {
      winner: null,
      hand: null
    };
    if (rankBlack.value > rankWhite.value) {
      res.winner = 'black';
      res.hand = rankBlack.name;
    } else if (rankBlack.value < rankWhite.value) {
      res.winner = 'white';
      res.hand = rankWhite.name;
    } else {
      const highest = compareHighestCards(handBlack, handWhite);
      res.winner = highest.hand;
      if (highest.hand !== 'Tie') {
        res.hand = rankBlack.name;
      }
    }

    return res;
  },
  getHand: () => {
    const result = [];
    const valuesLength = values.length;
    const suitsLength = suits.length;
    for (i = 0; i < 5; i++) {
      const card = `${values[Utils.getRandomInt(valuesLength)]}${
        suits[Utils.getRandomInt(suitsLength)]
      }`;
      result.push(card);
    }

    return result;
  }
};
