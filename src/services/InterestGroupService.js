const services = require('../util/services');

console.log(
    `interestGroup-service: ${process.env.INTEREST_GROUP_SERVICE_SERVICE_HOST}`
);

if (!process.env.INTEREST_GROUP_SERVICE_SERVICE_HOST) {
    process.env['INTEREST_GROUP_SERVICE_SERVICE_HOST'] = 'localhost:5000';
}

module.exports = {
    async userInfo(userId) {
        return await services.fetch.get(
            'interest_group',
            `warning/userinfo`,
            {},
            userId
        );
    },

    async send() {
        throw Error('Not implemented yet');
    },
};
