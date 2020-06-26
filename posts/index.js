const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { randomBytes } = require('crypto');

const app = express();

const posts = {};

app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {
    res.send(posts);
});


app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id, title
    };
    await axios.post('http://local:4005/events', {
        type: 'PostCreated',
        data: {
            id,title
        }
    });
    res.status(201).send(posts[id]);
});


app.post('/events', async (req, res) => {
    console.log('Recieved Events', req.body);

    res.send({});
});

app.listen(4000, () => {
    console.log('Post Service Listening on 4000');
})