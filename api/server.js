const express = require('express');

const beersRouter = require('./beers/beers-router');

const server = express();

server.use(express.json());
server.use('/beers', beersRouter);

module.exports = server;