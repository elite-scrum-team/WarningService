
const router = require('express').Router()

const ContractControler = require('../controllers/ContractController')




router.post('/', async (req, res) => {
    const instance = await ContractControler.create(req.body, req.query.interalUserId)
    if (!instance.error) {
        res.send(instance)
    } else {
        res.status(instance.error).send(instance.error)
    }
})