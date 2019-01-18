const UserService = require('../services/UserService');

module.exports = async (req, res, next) => {
    const r = await UserService.retriveOne(req.query.internalUserId);
    if (r.status == 200) req.user = await r.json();
    next();
};
