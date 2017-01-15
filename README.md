# e-num.js

### Installation
`$ npm install -S e-num`

### Usage
```javascript
import Enumeration from 'e-num';

const SUIT = Enumeration.create({
    CLUBS:    1,
    DIAMONDS: 2,
    HEARTS:   3,
    SPADES:   4
});

assert(SUIT instanceof Enumeration);
assert(SUIT.CLUBS instanceof Enumeration);
assert(SUIT.CLUBS instanceof SUIT);
assert(SUIT.getByKey('DIAMONDS') === SUIT.DIAMONDS);
assert(SUIT.getByValue(3) === SUIT.HEARTS);
assert(Number(SUIT.SPADES) === 4);
assert(String(SUIT.SPADES) === 'SPADES');

const COLOR = Enumeration.create({
    RED:   1,
    GREEN: 2,
    BLUE:  4
});

assert(SUIT.SPADES !== COLOR.BLUE);
```
