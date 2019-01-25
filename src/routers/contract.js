/**
 * Contract routers
 * @module routers/contract
 * @requires express
 * @requires ContractController
 */

const ContractControler = require('../controllers/ContractController');

/**
 * Express route for contracts
 * @namespace locationRouter
 */
const router = require('express').Router();

/**
 * Route for creating a contract
 * @function
 * @name POST-CreateContract
 * @param {string} path - "/"
 * @param {callback} route - The route
 */
router.post('/', async (req, res) => {
    const instance = await ContractControler.create(
        req.body,
        req.query.interalUserId
    );
    if (!instance.error) {
        res.send(instance);
    } else {
        res.status(instance.error).send(instance.error);
    }
});

module.exports = router;
