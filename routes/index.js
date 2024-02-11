const express = require('express');
const routes = express.Router();

const accountRouter = require('./accounts');
routes.use('/accounts', accountRouter);

module.exports = routes;