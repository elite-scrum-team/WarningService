const controller = require('../controllers/contract')

module.exports = function(router) {


    router.route('/')
    .post((req, res) =>
        controller
        .create(...req.body.payload)
        .then(con => res.json(con.toJSON()))
        .catch(err => res.status(400).json({ err })))

    .get((_, res) =>
        controller
        .readAll()
        .then(cons => res.json(cons.toJSON()))
        .catch(err => res.status(400).json({ err })))


    router.route('/:id')
    .get((req, res) =>
        controller
        .read(req.params.id)
        .then(con => res.json(con.toJSON()))
        .catch(err => res.status(400).json({ err })))

    .delete((req, res) =>
        controller
        .delete(req.params.id)
        .then(con => res.json(con.toJSON()))
        .catch(err => res.status(400).json({ err })))


    return router
}