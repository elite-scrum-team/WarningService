
const express = require('express');

const CategoryController = require('../controllers/CategoryController');

const router = express.Router();

router.get('/', async (req, res) => {
    await res.send(await CategoryController.retrive());
});

module.exports = router;


