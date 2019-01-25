/**
 * Status routers
 * @module routers/status
 * @requires express
 * @requires StatusController
 */

const StatusController = require('../controllers/StatusController');

/**
 * Express route for statuses
 * @namespace statusRouter
 */
const router = require('express').Router();

/**
 * Route for creating a status
 * @function
 * @name POST-CreateStatus
 * @param {string} path - "/"
 * @param {callback} route - The route
 */
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
