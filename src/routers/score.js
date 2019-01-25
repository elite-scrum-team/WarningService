/**
 * Score routers
 * @module routers/score
 * @requires express
 * @requires ScoreController
 */

const ScoreController = require('../controllers/ScoreController');
const express = require('express');

/**
 * Express route for locations
 * @namespace scoreRouter
 */
const router = express.Router();

/**
 * Route for getting the score for the currently logged-in user
 * @function
 * @name GET-GetScoreForCurrentlyLoggedInUser
 * @param {string} path - "/"
 * @param {callback} route - The route
 */
router.get('/', async (req, res) => {
    const score = await ScoreController.getScoreForUser(
        req.query.internalUserId
    );
    await res.send({ score: score });
});

module.exports = router;
