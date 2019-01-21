const express = require('express');

const CategoryController = require('../controllers/CategoryController');

const router = express.Router();

router.get('/', async (req, res) => {
    const r = await CategoryController.retrive();
    console.log(r);
    await res.send(r);
});

module.exports = router;
