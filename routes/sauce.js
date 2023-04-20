const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
//import de controllers sign up
const sauceCtrl = require("../controllers/sauce");


//post
router.post('/', auth, sauceCtrl.createSauce);
//Put
router.put('/:id', auth,sauceCtrl.modifySauce);
//delete
router.delete('/:id', auth, sauceCtrl.deleteSauce);
//get
router.get('/', auth, sauceCtrl.getAllSauces);
//get:id
router.get('/:id',auth, sauceCtrl.getOneSauce);

module.exports = router;
