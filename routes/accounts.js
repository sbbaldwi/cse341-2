const express = require('express');
const router = express.Router();

const accountController = require('../controllers/accounts');

router.get('/accounts', accountController.getAll);
router.get('/:id', accountController.getSingle);
router.post('/accounts', accountController.createAccount);
router.put('/:id', accountController.updateAccount);
router.delete('/:id', accountController.deleteAccount);

module.exports = router;