'use strict'

const express = require('express')
const fs = require('fs')

const router = express.Router()

fs
.readdirSync(__dirname)
.filter(file => file != 'index.js')
.forEach(file => {
    let name = file.substr(0, file.indexOf('.'))
    router.use(`/${name}`, require(`./${name}`)(express.Router()))
})

module.exports = router