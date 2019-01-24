const services = require('../util/services');

console.log(`user-service: ${process.env.USER_SERVICE_SERVICE_HOST}`);

module.exports = {
    async retriveOne(id) {
        return await services.fetch.get('user', `user/${id}`, {});
    },

    async retrieveOneGroup(id) {
        return await services.fetch.get('user', `group/${id}`, {});
    },
};
