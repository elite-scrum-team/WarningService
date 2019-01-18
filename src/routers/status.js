const StatusController = require('../controllers/StatusController');

const router = require('express').Router();

router.route('/').post(async (req, res) => {
    // TODO: Add permissions middleware, to make sure only admins can post status
    const result = await StatusController.create(
        req.body,
        req.query.internalUserId
    );
    if (result) {
        await res.send(result);
    } else {
        await res.send({ error: 'Could not create status' });
    }
});

module.exports = router;
