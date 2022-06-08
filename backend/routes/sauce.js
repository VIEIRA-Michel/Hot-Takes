const express = require('express');
const helmet = require('helmet');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', helmet(), auth, multer, sauceCtrl.createSauce);
router.get('/', helmet(), auth, multer, sauceCtrl.getAllSauces);
router.get('/:id', helmet(), auth, sauceCtrl.getOneSauce);
router.delete('/:id', helmet(), auth, sauceCtrl.deleteSauce);
router.put('/:id', helmet(), auth, multer, sauceCtrl.modifySauce);
router.post('/:id/like', helmet(), auth, multer, sauceCtrl.likeOrDislikeSauce);

module.exports = router;
