const controller = require('../controllers/warningcontent')
const errMap = require('../helpers/mapErrorsToMessage')

module.exports = function(router) {


    router.route('/:id')
        .get((req, res) => 
        controller
        .read(req.params.id)
        .then(cont => res.json(cont))
        .catch(err => res.status(400).json(errMap(err))))


    return router
}