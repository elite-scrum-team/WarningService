/**
 * Category routers
 * @module routers/category
 * @requires express
 * @requires CategoryController
 */

const express = require('express');
const CategoryController = require('../controllers/CategoryController');

/**
 * Express route for categories
 * @namespace categoryRouter
 */
const router = express.Router();

/**
 * Route for getting all categories
 * @function
 * @name GET-GetCategories
 * @param {string} path - "/"
 * @param {callback} route - The route
 */
router.get('/', async (req, res) => {
    const r = await CategoryController.retrive();
    console.log(r);
    await res.send(r);
});

/**
 * Route for getting a category
 * @function
 * @name GET-GetCategory
 * @param {string} path - "/:id"
 * @param {callback} route - The route
 */
router.get('/:id', async (req, res) => {
    const r = await CategoryController.retriveOne(req.params.id);
    await res.status(r ? 200 : 404).send(r);
});

/**
 * Route for creating a category
 * @function
 * @name POST-CreateCategory
 * @param {string} path - "/"
 * @param {callback} route - The route
 */
router.post('/', async (req, res) => {
    const r = await CategoryController.create(req.body.name);
    console.log(r);
    await res.send(r, r ? 201 : 500);
});

/**
 * Route for deleting a category
 * @function
 * @name DELETE-DeleteCategory
 * @param {string} path - "/:id"
 * @param {callback} route - The route
 */
router.delete('/:id', async (req, res) => {
    const r = await CategoryController.delete(req.params.id);
    await res.status(200).send({});
});

module.exports = router;
