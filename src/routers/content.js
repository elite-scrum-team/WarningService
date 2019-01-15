
const WarningController = require('../controllers/WarningController')

const router = require('express').Router()



router.get('/:id', async (req, res) => {
    try {
        const result = await WarningController.retrieveContent(req.params.id)
        if (result) {
            await res.send(result)
        } else {
            await res.send({ error: 'Could not get content' }, 500)
        }
    } catch (err) {
        console.log(err)
        res.send({ err }, 500)
    }
})


module.exports = router