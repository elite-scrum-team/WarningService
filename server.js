const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
require('dotenv').config()


console.log("Initing DB")

const sequelize = require('./models').sequelize
console.log("Init successful")


// const { MainCategory } = require('./models')
// MainCategory.findAll({ raw: true }).then(res => console.log(res))
// MainCategory.findById(1, { raw: true }).then(console.log)
// MainCategory.findById(4).then(res => res.destroy()).then(console.log)


const app = express()
app.use(logger('dev'))
app.use(bodyParser.json())

/*
app.get('/', async (req, res) => {
    await res.send('Hello world11')
})*/

const routes = require('./routes')
app.use('/', routes)

app.all('*', (_, res) => res.status(404).json(["Could not process request, check if json is valid"]))

const port = process.env.port | 80

app.listen(port, () => console.log(`listening on port ${port}`))

module.exports = {
    app,
    sequelize
}
