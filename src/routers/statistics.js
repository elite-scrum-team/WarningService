const express = require('express');

const StatisticsController = require('../controllers/StatisticsController');

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.query.from && req.query.to) {
        await StatisticsController.distrobution(req.query.from, req.query.to);
        await res.send('sucess');
    } else {
        await res.status(400).send('invalid');
    }
});

module.exports = router;
