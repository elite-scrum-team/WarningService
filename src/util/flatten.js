/**
 * Helper-function
 * @module util/flatten
 */

module.exports = arr =>
    /**
     * @function
     * Function that allows flattening of arrays
     *
     * @param {Array} arr the array to be flattened
     *
     * @returns {Array} returns a new array which is flattened
     */
    arr.reduce((accumulator, currentValue) => accumulator.concat(currentValue));
