const controller = require('../controllers/comment')

module.exports = function(router) {


    router.route('/')
    .post((req, res) =>
        controller
        .create(...req.body.payload)
        .then(com => res.json(com.toJSON()))
        .catch(err => res.status(400).json({ err })))

    .get((_, res) =>
        controller
        .readAll()
        .then(coms => res.json(coms.toJSON()))
        .catch(err => res.status(400).json({ err })))


    router.route('/:id')
    .get((req, res) =>
        controller
        .read(req.params.id)
        .then(com => res.json(com.toJSON()))
        .catch(err => res.status(400).json({ err })))

    .delete((req, res) =>
        controller
        .delete(req.params.id)
        .then(com => res.json(com.toJSON()))
        .catch(err => res.status(400).json({ err })))


    return router
}