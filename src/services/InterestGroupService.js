const services = require('../util/services');

console.log(
    `interestGroup-service: ${process.env.INTEREST_GROUP_SERVICE_SERVICE_HOST}`
);

module.exports = {
    async userInfo(userId, warningId) {
        return await services.fetch.get(
            'interest_group',
            'warning/userinfo',
            { warningId },
            userId
        );
    },

    async sendUpdate(title, comment, warningId, status = undefined) {
        return await services.fetch.post(
            'interest_group',
            'warning/send',
            {},
            { title, comment, warningId, status }
        );
    },
};
