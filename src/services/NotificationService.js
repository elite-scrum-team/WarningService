const services = require('../util/services');

/**
 * A service made to communicate with notification service
 * @module services/NotificationService
 */

module.exports = {
    /**
     * @function
     * Function that sends an email to the company that is assigned a new contract
     *
     * @param {Object} c Contract instance so the email can contain the necessary info
     */
    email: {
        async contract(c) {
            console.log('send mail?');
        },
    },
};
