/**
 * Content routers
 * @module routers/content
 * @requires express
 * @requires WarningController
 */

const WarningController = require('../controllers/WarningController');

/**
 * Express route for locations
 * @namespace contentRouter
 */
const router = require('express').Router();

/**
 * Route for getting the content of a warning
 * @function
 * @name GET-WarningContent
 * @param {string} path - "/:id"
 * @param {callback} route - The route
 */
router.get('/:id', async (req, res) => {
    try {
        const result = await WarningController.retrieveContent(req.params.id);
        if (result) {
            await res.send(result);
        } else {
            await res.send({ error: 'Could not get content' }, 500);
        }
    } catch (err) {
        console.log(err);
        res.send({ err }, 500);
    }
});

module.exports = router;
