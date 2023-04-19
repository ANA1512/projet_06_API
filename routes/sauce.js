const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
//import de controllers sign up
const sauceCtrl = require("../controllers/sauce");


//post
router.post('/',sauceCtrl.createSauce);


//get
router.get('/', sauceCtrl.getAllSauces);
//get:id
router.get('/:id', sauceCtrl.getOneSauce)

module.exports = router;
