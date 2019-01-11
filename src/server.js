
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')

require('dotenv').config()

const sequelize = require('./models').sequelize

const app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(require('./middleware/addMethod.js');

const routes = require('./routes')
app.use('/', routes)

app.all('*', (_, res) => res.status(404).json(["Could not process request, check if json is valid"]))

const port = process.env.port | 80

app.listen(port, () => console.log(`listening on port ${port}`))

module.exports = {
    app,
    sequelize
}
