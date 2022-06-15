const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const checkInput = require('../middleware/checkInput');

router.post('/', auth, multer, checkInput, sauceCtrl.createSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.put('/:id', auth, multer, checkInput, sauceCtrl.modifySauce);
router.post('/:id/like', auth, sauceCtrl.likeOrDislikeSauce);

module.exports = router;
