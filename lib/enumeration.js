/**
 * @static
 */
class Enumeration {
    /**
     * @param {Object.<String, Number>} [definition = {}]
     */
    static create(definition = {}) {
        const Enum = class extends Enumeration {
            static getByValue(value) {
                const key = Object
                    .keys(this)
                    .find(key => Number(this[key]) === value);

                return this.getByKey(key);
            }

            static getByKey(key) {
                if (this.hasOwnProperty(key) === false) {
                    throw new ReferenceError();
                }

                return this[key];
            }
        };

        Object
            .keys(definition)
            .forEach(createIdentifier);

        return Enum;

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

export default Enumeration;
