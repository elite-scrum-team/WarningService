
const express = require('express');

const WarningController = require('../controllers/WarningController');

const router = express.Router();

router.post('/', async (req, res) => {
    const instanceOrError = await WarningController.create(req.body, req.query.internalUserId);
    await res.send(instanceOrError);    
});

router.get('/', async (req, res) => {
    const result = await WarningController.retrieve(req.query, req.query.internalUserId)
    await res.send(result)
})

module.exports = router;
