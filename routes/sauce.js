const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
//import de controllers sign up
const sauceCtrl = require("../controllers/sauce");


//post
router.post('/', auth, multer, sauceCtrl.createSauce);
//Put
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
//delete
router.delete('/:id', auth, sauceCtrl.deleteSauce);
//post like
router.post('/:id/like', auth, sauceCtrl.likeSauce);
//get
router.get('/', auth, sauceCtrl.getAllSauces);
//get:id
router.get('/:id', auth, sauceCtrl.getOneSauce);

module.exports = router;

