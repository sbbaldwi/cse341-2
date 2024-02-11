const express = require('express');
const router = express.Router();

const accountController = require('../controllers/accounts');

router.get('/', accountController.getAll);
router.get('/:id', accountController.getSingle);
router.post('/', accountController.createAccount);
router.put('/:id', accountController.updateAccount);
router.delete('/:id', accountController.deleteAccount);

module.exports = router;