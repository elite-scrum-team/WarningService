const controller = require('../controllers/maincategory');
const errMap = require('../helpers/mapErrorsToMessage');

module.exports = function(router) {
    router
        .route('/')
        .post((req, res) =>
            controller
                .create(req.body.payload)
                .then(cat => res.json(cat))
                .catch(err => res.status(400).json(errMap(err)))
        )

        .get((_, res) =>
            controller
                .readAll()
                .then(cats => res.json(cats))
                .catch(err => res.status(400).json(errMap(err)))
        );

    router
        .route('/:id')
        .get((req, res) =>
            controller
                .read(req.params.id)
                .then(cat => res.json(cat))
                .catch(err => res.status(400).json(errMap(err)))
        )

        .delete((req, res) =>
            controller
                .delete(req.params.id)
                .then(cat => res.json(cat))
                .catch(err => res.status(400).json(errMap(err)))
        );

    return router;
};
