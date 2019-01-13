
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.port || 4000;

app.use(bodyParser());

app.get('/', async (req, res) {
    await res.send({
        message: 'hello world!'
    });
});

app.listen(port, () => console.log(`listening on port ${port}`))
