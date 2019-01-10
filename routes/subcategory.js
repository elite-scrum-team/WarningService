const controller = require('../controllers/subcategory')

module.exports = function(router) {


    router.route('/')
    .post((req, res) =>
        controller
        .create(...req.body.payload)
        .then(cat => res.json(cat.toJSON()))
        .catch(err => res.status(400).json({ err })))

    .get((_, res) =>
        controller
        .readAll()
        .then(cats => res.json(cats.toJSON()))
        .catch(err => res.status(400).json({ err })))


    router.route('/:id')
    .get((req, res) =>
        controller
        .readAll(req.params.id)
        .then(cat => res.json(cat.toJSON()))
        .catch(err => res.status(400).json({ err })))

    .delete((req, res) =>
        controller
        .delete(req.params.id)
        .then(cat => res.json(cat.toJSON()))
        .catch(err => res.status(400).json({ err })))

    
    return router
}