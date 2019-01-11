const controller = require('../controllers/image');
const errMap = require('../helpers/mapErrorsToMessage');
const upload = require('../middleware/googleCloudStorage');

module.exports = function(router) {
    router
        .route('/')
        .post(upload.single('warningImage'), (req, res) =>
            controller
                .create(req.file.location)
                .then(img => res.json(img))
                .catch(err => res.status(400).json(errMap(err)))
        )

        .get((_, res) =>
            controller
                .readAll()
                .then(imgs => res.json(imgs))
                .catch(err => res.status(400).json(errMap(err)))
        );

    router
        .route('/:id')
        .get((req, res) =>
            controller
                .read(req.params.id)
                .then(img => res.json(img))
                .catch(err => res.status(400).json(errMap(err)))
        )

        .delete((req, res) =>
            controller
                .delete(req.params.id)
                .then(img => img.json(img))
                .catch(err => res.status(400).json(errMap(err)))
        );

    return router;
};
