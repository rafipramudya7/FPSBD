const express = require('express');
const router = express.Router();

const menuController =
require('../controllers/pemesanController');

router.get('/', menuController.index);

router.get('/create', menuController.createForm);
router.post('/create', menuController.store);

router.get('/edit/:id', menuController.editForm);
router.post('/edit/:id', menuController.update);
router.get('/delete/:id', menuController.destroy);

module.exports = router;