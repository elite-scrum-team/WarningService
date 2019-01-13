
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const client = require('prom-client');

const app = express();
const port = process.env.port || 4000;

// metrics
client.collectDefaultMetrics({ timeout: 5000 });

app.get('/metrics', async (req, res) => {
    await res.set('Content-Type', client.register.contentType);
    await res.end(client.register.metrics());
});

// middleware

app.use(bodyParser());
app.use(morgan('dev'));

app.get('/', async (req, res) => {
    await res.send({
        message: 'hello world!'
    });
});

app.listen(port, () => console.log(`listening on port ${port}`))

