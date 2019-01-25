/**
 * Comment routers
 * @module routers/comment
 * @requires express
 * @requires CommentController
 */

const CommentController = require('../controllers/CommentController');
const express = require('express');

/**
 * Express route for comments
 * @namespace commentRouter
 */
const router = express.Router();

/**
 * Route for creating a comment
 * @function
 * @name POST-CreateComment
 * @param {string} path - "/"
 * @param {callback} route - The route
 */
router.post('/', async (req, res) => {
    const { warningId, content, fileURL } = req.body;
    const comment = await CommentController.create(
        warningId,
        content,
        fileURL,
        req.query.internalUserId
    );
    if (comment) {
        res.send(comment);
    } else {
        res.status(400).send({ error: 'invalid' });
    }
});

module.exports = router;
