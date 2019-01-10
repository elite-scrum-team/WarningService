const controller = require('../controllers/maincategory')

module.exports = function(router) {


    router.route('/')
    .post((req, res) => {
        console.log("HELLO!")
        console.log(req.body)
        controller
        .create(req.body.payload.categoryName)
        .then(cat => res.json(cat.toJSON()))
        .catch(err => res.status(400).json({ err }))})

    .get((_, res) =>
        controller
        .readAll()
        .then(cats => res.json(cats.toJSON()))
        .catch(err => res.status(400).json({ err })))


    router.route('/:id')
    .get((req, res) =>
        controller
        .read(req.params.id)
        .then(cat => res.json(cat.toJSON()))
        .catch(err => res.status(400).json({ err })))

    .delete((req, res) =>
        controller
        .delete(req.params.id)
        .then(cat => res.json(cat.toJSON()))
        .catch(err => res.status(400).json({ err })))


    return router
}
