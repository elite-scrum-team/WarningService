/**
 * Warning routers
 * @module routers/warning
 * @requires express
 * @requires WarningController
 * @requires addUserData
 */

const express = require('express');
const WarningController = require('../controllers/WarningController');
const addUserData = require('../middleware/user');

/**
 * Express route for warnings
 * @namespace warningRouter
 */
const router = express.Router();

/**
 * Route for getting a warning
 * @function
 * @name GET-Warning
 * @param {string} path - "/:id"
 * @param {callback} route - The route
 */
router.get('/:id', async (req, res) => {
    const r = await WarningController.retriveOne(
        req.params.id,
        req.query.internalUserId
    );
    if (r) {
        await res.send(r);
    } else {
        await res.send({ error: 'Warning with that id does not exist' }, 404);
    }
});

/**
 * Route for updating a warning
 * @function
 * @name PUT-UpdateWarning
 * @param {string} path - "/:id"
 * @param {callback} route - The route
 */
router.put('/:id', async (req, res) => {
    const result = await WarningController.update(req.params.id, req.body);
    if (result) {
        await res.send(result);
    } else {
        await res.send({ error: 'Could not update warning' }, 500);
    }
});

/**
 * Route for deleting a warning
 * @function
 * @name DELETE-DeleteWarning
 * @param {string} path - "/:id"
 * @param {callback} route - The route
 */
router.delete('/:id', async (req, res) => {
    try {
        const result = await WarningController.delete(
            req.params.id,
            req.query.internalUserId
        );
        await res.send(result);
    } catch (err) {
        console.error(err);
        await res.status(500).send(err);
    }
});

/**
 * Route for creating a warning
 * @function
 * @name POST-CreateWarning
 * @param {string} path - "/"
 * @param {callback} route - The route
 */
router.post('/', async (req, res) => {
    const instanceOrError = await WarningController.create(
        req.body,
        req.query.internalUserId
    );
    await res.send(instanceOrError);
});

/**
 * Route for creating a warning
 * @function
 * @name GET-Warnings
 * @param {string} path - "/"
 * @param {callback} route - The route
 */
router.get('/', addUserData, async (req, res) => {
    console.log(req.query);
    const result = await WarningController.retrieve(
        req.query,
        req.query.internalUserId
    );
    await res.send(result);
});

module.exports = router;
