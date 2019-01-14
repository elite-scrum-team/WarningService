
const services = require('../util/services');

console.log(`user-service: ${process.env.USER_SERVICE_SERVICE_HOST}`);

if (!process.env.USER_SERVICE_SERVICE_HOST) {
    process.env['USER_SERVICE_SERVICE_HOST'] = '35.228.101.13';
}

module.exports = {
    async retriveOne(id) {
        return await services.fetch.get('user', `user/${id}`, {});
    }

}
