'use strict';

/**
 * @static
 */
class Enumeration {
    /**
     * @param {Object.<String, Number>} [definition = {}]
     */
    static create(definition = {}) {
        const Enum = class extends Enumeration {
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
        };

        if (typeof definition !== 'object') {
            throw TypeError('Enum definition must be an Object');
        }

        Object
            .keys(definition)
            .map(checkValueType)
            .forEach(createIdentifier);

        return Enum;

        function checkValueType(key) {
            if (typeof definition[key] !== 'number') {
                throw new TypeError('Associated value must be a Number');
            }

            return key;
        }

        function createIdentifier(key) {
            Enum[key] = new (class extends Enum {
                valueOf() {
                    return definition[key];
                }

                toString() {
                    return String(key);
                }
            })();
        }
    }
}

module.exports = Enumeration;
