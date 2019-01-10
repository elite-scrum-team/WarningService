const controller = require('../controllers/maincategory')

module.exports = function(router) {


    router.route('/')
    .post((req, res) =>
        controller
        .create(req.body.payload.name)
        .then(cat => res.json(cat.toJSON())))

    .get((_, res) =>
        controller
        .readAll()
        .then(cats => res.json(cats.toJSON())))


    router.route('/:id')
    .get((req, res) =>
        controller
        .read(req.params.id)
        .then(cat => res.json(cat.toJSON())))

    .delete((req, res) =>
        controller
        .delete(req.params.id)
        .then(cat => res.json(cat.toJSON())))
        

    return router
}