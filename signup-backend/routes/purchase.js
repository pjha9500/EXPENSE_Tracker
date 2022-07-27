const express = require('express');

const purchaseController = require('../controllers/purchase');

const authenticatemiddleware = require('../authorization/authorization')

const router = express.Router();

router.get('/premiummembership', authenticatemiddleware.authenticateToken,purchaseController.purchasepremium);

router.post('/updatetransactionstatus', authenticatemiddleware.authenticateToken, purchaseController.updateTransactionStatus);

module.exports = router;