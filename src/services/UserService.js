const services = require('../util/services');
console.log(`user-service: ${process.env.USER_SERVICE_SERVICE_HOST}`);

/**
 * A service to contact user service
 * @module services/UserService
 */

module.exports = {
    /**
     * @function
     * Retrieves user info for a single user from user service
     *
     * @param {UUID} id userId
     *
     * @returns {Object} returns filtered user data values
     */
    async retriveOne(id) {
        return await services.fetch.get('user', `user/${id}`, {});
    },

    /**
     * @function
     * Retrieves the information for a single group
     *
     * @param {UUID} id userId
     *
     * @returns {Object} returns group data values
     */
    async retrieveOneGroup(id) {
        return await services.fetch.get('user', `group/${id}`, {});
    },
};
