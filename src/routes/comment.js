const controller = require('../controllers/comment');
const errMap = require('../helpers/mapErrorsToMessage');

module.exports = function(router) {
    router
        .route('/')
        .post((req, res) =>
            controller
                .create(req.body.payload)
                .then(com => res.json(com))
                .catch(err => res.status(400).json(errMap(err)))
        )

        .get((_, res) =>
            controller
                .readAll()
                .then(coms => res.json(coms))
                .catch(err => res.status(400).json(errMap(err)))
        );

    router
        .route('/:id')
        .get((req, res) =>
            controller
                .read(req.params.id)
                .then(com => res.json(com))
                .catch(err => res.status(400).json(errMap(err)))
        )

        .delete((req, res) =>
            controller
                .delete(req.params.id)
                .then(com => res.json(com))
                .catch(err => res.status(400).json(errMap(err)))
        );

    return router;
};
