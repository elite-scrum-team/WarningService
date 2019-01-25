const services = require('../util/services');

const UserService = require('./UserService');

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
            // email, title, name, details
            // Hvem skal email gå til... det finnes ingen endpoint i user service til å hente ut emailene til folk i en bestemt gruppe
            const group = await UserService.retrieveOneGroup(
                c.dataValues.groupId
            ).then(it => it.json());
            const warning = await c.getWarning();
            const category = await warning.getCategory();

            let email = 'halvorfb@stud.ntnu.no';
            let name = group.name;
            let title = category.dataValues.name;
            let details = warning.dataValues.description;

            return await services.fetch.post(
                'notification',
                'email/newcontract',
                {},
                { email, title, name, details }
            );
        },
    },
};
