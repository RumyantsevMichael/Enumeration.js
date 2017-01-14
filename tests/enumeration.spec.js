'use strict';

const Enumeration = require('../lib/enumeration.js');

const SUIT = Enumeration.create({
    CLUBS:    1,
    DIAMONDS: 2,
    HEARTS:   3,
    SPADES:   4
});

console.assert(SUIT.CLUBS instanceof Enumeration);
console.assert(SUIT.CLUBS instanceof SUIT);
console.assert(SUIT.getByKey('DIAMONDS') === SUIT.DIAMONDS);
console.assert(SUIT.getByValue(3) === SUIT.HEARTS);
console.assert(Number(SUIT.SPADES) === 4);
console.assert(String(SUIT.SPADES) === 'SPADES');

const COLOR = Enumeration.create({
    RED:   1,
    GREEN: 2,
    BLUE:  4
});

console.assert(SUIT.SPADES !== COLOR.BLUE);
