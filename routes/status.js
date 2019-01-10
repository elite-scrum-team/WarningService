const controller = require('../controllers/status')

module.exports = function(router) {


    router.route('/')
    .post((req, res) =>
        controller
        .create({ ...req.body.payload })
        .then(stat => res.json(stat.toJSON()))
        .catch(err => res.status(400).json({ err })))

    .get((_, res) =>
        controller
        .readAll()
        .then(stats => res.json(stats.toJSON()))
        .catch(err => res.status(400).json({ err })))


    router.route('/:id')
    .get((req, res) =>
        controller
        .read(req.params.id)
        .then(stat => res.json(stat.toJSON()))
        .catch(err => res.status(400).json({ err })))

    .delete((req, res) =>
        controller
        .delete(req.params.id)
        .then(stat => res.json(stat.toJSON()))
        .catch(err => res.status(400).json({ err })))


    return router
}
