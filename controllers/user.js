//import du model user
const User = require('../models/user');

// install and import jsonwebtoken ( authentification)
const jwt = require('jsonwebtoken');

// crypt password
const bcrypt = require('bcrypt');

//import crypto.js
const cryptojs =  require('crypto-js');

// import de dotenv
const dotenv = require('dotenv');
const result = dotenv.config();

// user entry in BD
exports.signup = (req, res, next) => {

//crypter email
const cryptoMail = cryptojs.SHA256(req.body.email, `${process.env.CRYPTO_KEY_MAIL }`).toString();

//Crypter data user with hash
bcrypt.hash(req.body.password, 10)
.then(hash => {
  const user = new User({
    email: cryptoMail,
    password: hash
  });
  user.save()
    .then(() => res.status(201).json({ message: 'Utilisateur crée dans la base de donnée!' }))
    .catch(error => res.status(400).json({ error: 'Utilisateur non crée' }));
})
.catch(error => res.status(500).json({ error }));


};



// Login user
exports.login = (req, res, next) => {

  //crypter email
const cryptoMail = cryptojs.SHA256(req.body.email, `${process.env.CRYPTO_KEY_MAIL }`).toString();

  User.findOne({ email: cryptoMail })
      .then(user => {
          if (!user) {
              return res.status(401).json({ error: ' Utilisateur/mot de passe incorrecte!' });
          }
          bcrypt.compare(req.body.password, user.password)
              .then(valid => {
                  if (!valid) {
                      return res.status(401).json({ error: 'Utilisateur/mot de passe incorrecte !' });
                  }
                  res.status(200).json({
                      userId: user._id,
                      token: jwt.sign(
                          { userId: user._id },
                          'RANDOM_TOKEN_SECRET',
                          { expiresIn: '24h' }
                      )
                  });
              })
              .catch(error =>{   res.status(500).json({ error })});
      })
      .catch(error => { res.status(500).json({ error })});
};


