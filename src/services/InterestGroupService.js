const services = require('../util/services');

console.log(
    `interestGroup-service: ${process.env.INTEREST_GROUP_SERVICE_SERVICE_HOST}`
);

/**
 * A service made to communicate with notification service
 * @module services/InterestGroupService
 */

module.exports = {
    /**
     * @function
     * Function to check if a user is subscribed to a warning
     *
     * @param {UUID} userId
     * @param {UUID} warningId
     */
    async userInfo(userId, warningId) {
        return await services.fetch.get(
            'interest_group',
            'warning/userinfo',
            { warningId },
            userId
        );
    },

    /**
     * @function
     * Function called by status model and comment model when a new one is added
     * this results in an email being sent to subscribed users
     *
     * @param {string} title
     * @param {string} comment
     * @param {UUID} warningId
     * @param {integer} status
     */
    async sendUpdate(title, comment, warningId, status = undefined) {
        return await services.fetch.post(
            'interest_group',
            'warning/send',
            {},
            { title, comment, warningId, status }
        );
    },
};
