const express = require('express');

const server = express();
server.use(express.json());

const athletesRouter = require('./athletes/athletes-router');
server.use('/api/athletes', athletesRouter);

server.get('/', (req, res) => {
    res.json({ api: 'up and running' })
})

module.exports = server;
