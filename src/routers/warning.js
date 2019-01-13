
const express = require('express');

const WarningController = require('../controllers/WarningController');

const router = express.Router();

router.post('/', async (req, res) => {
    const instanceOrError = await WarningController.create(req.body, req.query.internalUserId);
    await res.send(instanceOrError);    
});

module.exports = router;
