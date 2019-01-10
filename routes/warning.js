const controller = require('../controllers/warning')

module.exports = function(router) {


    router.route('/')
    .post((req, res) =>
        controller
        .create({ ...req.body.payload })
        .then(warn => res.json(warn.toJSON()))
        .catch(err => res.status(400).json({ err })))

    .get((_, res) =>
        controller
        .readAll()
        .then(warns => res.json(warns.toJSON()))
        .catch(err => res.status(400).json({ err })))


    router.route('/:id')
    .get((req, res) =>
        controller
        .read(req.params.id)
        .then(warn => res.json(warn.toJSON()))
        .catch(err => res.status(400).json({ err })))

    .delete((req, res) =>
        controller
        .delete(req.params.id)
        .then(warn => res.json(warn.toJSON()))
        .catch(err => res.status(400).json({ err })))


    return router
}
