const controller = require('../controllers/image')

//const upload = require('../src/middleware/googleCloudStorage')

module.exports = function(router) {


    router.route('/')
    .post(/*upload.single('warningImage'), */(req, res) =>
        controller
        .create(...req.file.location)
        .then(img => res.json(img.toJSON()))
        .catch(err => res.status(400).json({ err })))

    .get((_, res) =>
        controller
        .readAll()
        .then(imgs => res.json(imgs.toJSON()))
        .catch(err => res.status(400).json({ err })))


    router.route('/:id')
    .get((req, res) =>
        controller
        .read(req.params.id)
        .then(img => res.json(img.toJSON()))
        .catch(err => res.status(400).json({ err })))

    .delete((req, res) =>
        controller
        .delete(req.params.id)
        .then(img => img.json(img.toJSON()))
        .catch(err => res.status(400).json({ err })))


    return router
}
