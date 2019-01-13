
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const client = require('prom-client');

const app = express();
const port = process.env.port || 4000;

app.use(bodyParser());
app.use(morgan('dev'));

app.get('/', async (req, res) => {
    await res.send({
        message: 'hello world!'
    });
});

app.listen(port, () => console.log(`listening on port ${port}`))

