const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const posts = {};


app.get('/posts', (req, res) => {
    res.send(posts);
});


app.post('/events', (req, res) => {
    const event = req.body;

    axios.post('http://local:4000/events', event);
    axios.post('http://local:4001/events', event);
    axios.post('http://local:4002/events', event);

    res.send({ status: 'OK' });
});

app.listen(4002, () => {
    console.log('Query Service Listening on 4002');
})