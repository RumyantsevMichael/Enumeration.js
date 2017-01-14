/**
 * @static
 */
var Enumeration = function Enumeration () {};

Enumeration.create = function create (definition) {
        if ( definition === void 0 ) definition = {};

    if (typeof definition !== 'object') {
        throw TypeError('Enumeration definition must be an Object');
    }

    Object
        .keys(definition)
        .filter(function (key) { return typeof definition[key] !== 'number'; })
        .forEach(function () {
            throw new TypeError('Associated value must be a Number')
        });

    var ConcreteEnumeration = (function (Enumeration) {
            function ConcreteEnumeration () {
                Enumeration.apply(this, arguments);
            }if ( Enumeration ) ConcreteEnumeration.__proto__ = Enumeration;
            ConcreteEnumeration.prototype = Object.create( Enumeration && Enumeration.prototype );
            ConcreteEnumeration.prototype.constructor = ConcreteEnumeration;

            

            return ConcreteEnumeration;
        }(Enumeration));

    Object
        .keys(definition)
        .forEach(createIdentifier);

    return ConcreteEnumeration;

    function createIdentifier(key) {
        var EnumerationIdentifier = (function (ConcreteEnumeration) {
                function EnumerationIdentifier () {
                    ConcreteEnumeration.apply(this, arguments);
                }

                if ( ConcreteEnumeration ) EnumerationIdentifier.__proto__ = ConcreteEnumeration;
                EnumerationIdentifier.prototype = Object.create( ConcreteEnumeration && ConcreteEnumeration.prototype );
                EnumerationIdentifier.prototype.constructor = EnumerationIdentifier;

                EnumerationIdentifier.prototype.valueOf = function valueOf () {
                return definition[key];
            };

            /**
             * @returns {String}
             */
            EnumerationIdentifier.prototype.toString = function toString () {
                return String(key);
            };

                return EnumerationIdentifier;
            }(ConcreteEnumeration));

        ConcreteEnumeration[key] = new EnumerationIdentifier();
        ConcreteEnumeration[key].key = key;
    }
};

/**
 * @param {Number} value
 * @returns {Enumeration}
 */
Enumeration.getByValue = function getByValue (value) {
        var this$1 = this;

    if (typeof value !== 'number') {
        throw new TypeError('<value> must be a Number');
    }

    var key = Object
        .keys(this)
        .find(function (key) { return Number(this$1[key]) === value; });

    return this.getByKey(key);
};

/**
 * @param {String} key
 * @returns {Enumeration}
 */
Enumeration.getByKey = function getByKey (key) {
    if (typeof key !== 'string') {
        throw new TypeError('<key> must be a String');
    }

    if (this.hasOwnProperty(key) === false) {
        throw new ReferenceError(("Enum member <" + key + "> is not defined"));
    }

    return this[key];
};

module.exports = Enumeration;

