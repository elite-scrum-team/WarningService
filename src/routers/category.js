const express = require('express');

const CategoryController = require('../controllers/CategoryController');

const router = express.Router();

router.get('/', async (req, res) => {
    const r = await CategoryController.retrive();
    console.log(r);
    await res.send(r);
});

router.post('/', async (req, res) => {
    const r = await CategoryController.create(req.body.name);
    console.log(r);
    await res.send(await r.json(), r.status);
});

router.delete('/:id', async (req, res) => {
    const r = await CategoryController.delete(req.query.id);
    await res.status(r.status);
});

module.exports = router;
