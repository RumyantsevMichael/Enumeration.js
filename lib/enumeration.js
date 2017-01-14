/**
 * @static
 */
class Enumeration {
    /**
     * @param {Object.<String, Number>} [definition = {}]
     * @returns {Enumeration}
     */
    static create(definition = {}) {
        if (typeof definition !== 'object') {
            throw TypeError('Enumeration definition must be an Object');
        }

        Object
            .keys(definition)
            .filter(key => typeof definition[key] !== 'number')
            .forEach(() => {
                throw new TypeError('Associated value must be a Number')
            });

        class ConcreteEnumeration extends Enumeration {}

        Object
            .keys(definition)
            .forEach(createIdentifier);

        return ConcreteEnumeration;

        function createIdentifier(key) {
            class EnumerationIdentifier extends ConcreteEnumeration {
                /**
                 * @returns {Number}
                 */
                valueOf() {
                    return definition[key];
                }

                /**
                 * @returns {String}
                 */
                toString() {
                    return String(key);
                }
            }

            ConcreteEnumeration[key] = new EnumerationIdentifier();
            ConcreteEnumeration[key].key = key;
        }
    }

    /**
     * @param {Number} value
     * @returns {Enumeration}
     */
    static getByValue(value) {
        if (typeof value !== 'number') {
            throw new TypeError('<value> must be a Number');
        }

        const key = Object
            .keys(this)
            .find(key => Number(this[key]) === value);

        return this.getByKey(key);
    }

    /**
     * @param {String} key
     * @returns {Enumeration}
     */
    static getByKey(key) {
        if (typeof key !== 'string') {
            throw new TypeError('<key> must be a String');
        }

        if (this.hasOwnProperty(key) === false) {
            throw new ReferenceError(`Enum member <${key}> is not defined`);
        }

        return this[key];
    }
}

module.exports = Enumeration;
