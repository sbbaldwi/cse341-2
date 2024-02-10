const express = require('express');
const routes = express.Router();

const contactsRouter = require('./account');
routes.use('/account', accountRouter);

module.exports = routes;