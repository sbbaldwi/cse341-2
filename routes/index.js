const express = require('express');
const routes = express.Router();

const accountRouter = require('./account');
routes.use('/account', accountRouter);

module.exports = routes;