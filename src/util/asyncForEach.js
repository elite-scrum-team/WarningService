/**
 * Helper-function
 * @module util/asyncForEach
 */

module.exports = async (array, callback) => {
    /**
     * @function
     * Function that allows for running async code in a forEach block
     *
     * @param {Array} array The array to run the forEach on
     * @param {Function} callback The function to run forEach element in array
     */
    for (let i = 0; i < array.length; i++) {
        await callback(array[i], i, array);
    }
};
