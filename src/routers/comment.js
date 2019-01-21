const CommentController = require('../controllers/CommentController');

const express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
    const { warningId, content } = req.body;
    const comment = await CommentController.create(
        warningId,
        content,
        req.query.internalUserId
    );
    if (comment) {
        res.send(comment);
    } else {
        res.status(400).send({ error: 'invalid' });
    }
});

module.exports = router;
