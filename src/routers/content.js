
const WarningController = require('../controllers/WarningController')

const router = require('express').Router()



router.get('/:id', async (req, res) => {
    const result = await WarningController.retrieveContent(req.params.id)
    if (result) {
        await res.send(result)
    } else {
        await res.send({ error: 'Could not get content' }, 500)
    }
})


module.exports = router