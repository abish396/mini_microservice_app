const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const { randomBytes } = require('crypto');

const app = express();

const commentsBypostId = {};

app.use(bodyParser.json());
app.use(cors());

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsBypostId[req.params.id] || []);
});


app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsBypostId[req.params.id] || [];
    comments.push({ id:commentId, content });
    commentsBypostId[req.params.id] = comments;
    
    await axios.post('http://local:4005/events', {
        type: 'CommentCreated',
        data: {
            id:commentId,
            content,
            postId: req.params.id
        }
    });

    res.status(201).send(comments);
});


app.post('/events', async (req, res) => {
    console.log('Recieved Events', req.body);

    res.send({});
});

app.listen(4001, () => {
    console.log('Comment Service Listening on 4001');
})