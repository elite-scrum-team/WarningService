const db = require('../models');

/**
 * Category Controller
 * @module controllers/CategoryController
 */

module.exports = {
    /**
     * @function
     * (*retrieve) function to retrieve all categories
     *
     * @returns {Object} returns the dataValues of all categories
     */
    async retrive() {
        try {
            const res = await db.category.findAll();
            return res.map(r => r.dataValues);
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    /**
     * @function
     * (*retrieveOne) function to retrieve one category
     *
     * @param {UUID} id The category id
     *
     * @returns {Object} returns the data values for the category with the given id
     */
    async retriveOne(id) {
        try {
            const res = await db.category.findByPk(id);
            return res;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    /**
     * @function
     * Function to create a persisted category instance
     *
     * @param {string} name
     *
     * @returns {Object} returns the data values to the created category instance
     */
    async create(name) {
        try {
            const res = await db.category.create({ name });
            return res;
        } catch (err) {
            console.error(err);
            return null;
        }
    },

    /**
     * @function
     * Function to delete a persisted category
     *
     * @param {UUID} commentId
     *
     * @returns {Object} returns the data values of the deleted category
     */
    async delete(commentId) {
        try {
            const res = await db.category.destroy({
                where: {
                    id: commentId,
                },
            });
            return res;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
};
