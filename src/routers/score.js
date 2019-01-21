const ScoreController = require('../controllers/ScoreController');

const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    const score = await ScoreController.getScoreForUser(
        req.query.internalUserId
    );
    await res.send({ score: score });
});

module.exports = router;
