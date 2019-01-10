'use strict'

const router = require('express').Router()
const fs = require('fs')

fs
.readdirSync(__dirname)
.filter(file => file != 'index.js')
.forEach(file => {
    let name = file.substr(0, file.indexOf('.'))
    router.use(`/${name}`, require(`./${name}`)(router))
})

module.exports = router