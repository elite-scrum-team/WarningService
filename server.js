
require('dotenv').config()
const express = require('express')
const Sequelize = require('sequelize')
const logger = require('morgan')
const bodyParser = require('body-parser')

const dbName = process.env.DB_NAME || ''
const dbUser = process.env.DB_USERNAME || ''
const dbPw = process.env.DB_PASSWORD || ''
const dbHost = process.env.DB_HOST || ''


console.log("Initing DB")
const sequelize = new Sequelize(
    dbName,
    dbUser,
    dbPw, 
    {
        host: dbHost,
        dialect: 'mysql',
        pool: {
            max: 2,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
)
console.log("Init successful")

// const { Main_Category } = require('./src/models/main_category')


const app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
    await res.send('Hello world11')
})

const port = process.env.port | 80

app.listen(port, () => console.log(`listening on port ${port}`))

module.exports = {
    app,
    sequelize
}