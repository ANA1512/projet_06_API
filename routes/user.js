const express = require('express');
const router = express.Router();

//import de controllers sign up
const userCtrl = require("../controllers/user");


//sign up router
router.post('/signup', userCtrl.signup);

//login router
router.post('/login', userCtrl.login);


module.exports = router;
