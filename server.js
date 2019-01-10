const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')


console.log("Initing DB")

const sequelize = require('./models').sequelize
sequelize.sync({ force: true })

console.log("Init successful")



const app = express()
app.use(logger('dev'))
app.use(bodyParser.json())

/*
app.get('/', async (req, res) => {
    await res.send('Hello world11')
})*/

const routes = require('./routes')
app.use('/', routes)

const port = process.env.port | 80

app.listen(port, () => console.log(`listening on port ${port}`))

module.exports = {
    app,
    sequelize
}
