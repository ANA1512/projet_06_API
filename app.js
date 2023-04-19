// Import d'express (gestion des req/rep)
const express =require('express');

//creation  app express
const app = express();

// on importe le router
const userRoutes = require('./routes/user');
const ficheUserRoutes = require('./routes/ficheuser');
const sauceRoutes = require('./routes/sauce');


//import body-parser
const bodyParser = require('body-parser');


// ---------connection BD-----------
//import .dotenv
// const dotenv = require('dotenv');
// const result = dotenv.config();

// import db
const mongoose = require("mongoose");

mongoose.set('strictQuery', true);// delete message terminal

// mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
//   { useNewUrlParser: true,
//     useUnifiedTopology: true })
//   .then(() => console.log('Connexion à MongoDB réussie !'))
//   .catch(() => console.log('Connexion à MongoDB échouée !'));

mongoose.connect('mongodb+srv://Anais15:AnaisPhilo1512@cluster0.ban0efq.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



//------------------------------CORS---------------------------------------------------------
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // autorisation pour utiliser certains entete
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // autorise certains verbe
  next();
});


// transform req body in json
app.use(bodyParser.json());

//Authorization routes
 app.use('/api/auth', userRoutes);


// test fiche
app.use('/api/fiche_user', ficheUserRoutes);

// sauce routes
app.use('/api/sauces',sauceRoutes);


// export app
module.exports = app;
