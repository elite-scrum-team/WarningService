const res = require('./res');

module.exports = {
    async transaction(Function) {
        res.dataValues = await Function();
        return res;
    },

    Promise: {
        reject() {
            return 'Instance failed';
        }
    }
};