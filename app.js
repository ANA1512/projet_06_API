// Import d'express (gestion des req/rep)
const express =require('express');
//creation  app express
const app = express();

// on importe le router
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

//import path
const path = require('path');
//import body-parser
const bodyParser = require('body-parser');
//import helmet secure header Http
const helmet = require("helmet");
//import express rate limit
const rateLimit= require("express-rate-limit");

// ---------connection BD-----------
//import .dotenv
const dotenv = require('dotenv');
const result = dotenv.config();

// import db
const mongoose = require("mongoose");

mongoose.set('strictQuery', true);// delete message terminal

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
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

// Connection attempts limited
const  limiter  =  rateLimit ( {
	windowMs : 60  *  60  *  1000 ,
	max : 10,
	message : " Merci de patienter une heure avant de vos reconnecter" ,
  standardHeaders : true ,
	legacyHeaders : false ,
} )
app.use(limiter)

//Use helmet -configuration error origin front
app.use(helmet({
  crossOriginResourcePolicy: false
}));
// transform req body in json
app.use(bodyParser.json());
// route multer
app.use('/images', express.static(path.join(__dirname, 'images')));
//Authorization routes
 app.use('/api/auth', userRoutes);
 // sauce routes
app.use('/api/sauces',sauceRoutes);


// export app
module.exports = app;
