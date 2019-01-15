
const express = require('express');

const WarningController = require('../controllers/WarningController');

const addUserData = require('../middleware/user');

const router = express.Router();

router.get('/:id', async (req, res) => {
    const r = await WarningController.retriveOne(req.params.id);
    if (r) {
        await res.send(r);
    } else {
        await res.send({ error: 'Warning with that id does not exist' }, 404);
    }
});

router.put('/:id', async (req, res) => {
    const result = await WarningController.update(req.params.id, req.body)
    if (result) { 
        await res.send(result)
    } else {
        await res.send({ error: 'Could not update warning' }, 500)
    }
})


router.post('/', async (req, res) => {
    const instanceOrError = await WarningController.create(req.body, req.query.internalUserId);
    await res.send(instanceOrError);    
});

router.get('/', addUserData, async (req, res) => {
    const result = await WarningController.retrieve(req.query, req.query.internalUserId)
    await res.send(result)
})

module.exports = router;
