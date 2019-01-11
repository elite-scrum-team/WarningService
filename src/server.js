
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')

require('dotenv').config()

// add metrics
const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const sequelize = require('./models').sequelize

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(require('./middleware/addMethod.js'))

app.get('/metrics', async (req, res) => {
    await res.set('Content-Type', client.register.contentType)
    await res.end(client.register.metrics())
});

app.use('/', require('./routes'))

app.all('*', (_, res) => res.status(404).json(["Could not process request, check if json is valid"]))

const port = process.env.port | 80

app.listen(port, () => console.log(`listening on port ${port}`))

module.exports = {
    app,
    sequelize
}
