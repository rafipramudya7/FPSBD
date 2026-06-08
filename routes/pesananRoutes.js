const express = require('express');
const router = express.Router();
const pesananController = require('../controllers/pesananController');

router.get('/create', pesananController.createForm);
router.post('/create', pesananController.store);
router.get('/invoice/:id_transaksi', pesananController.showInvoice);
router.post('/pembayaran/:id_transaksi', pesananController.processPayment);

module.exports = router;