// Import d'express (gestion des req/rep)
const express =require('express');

//creation  app express
const app=express();

//import body-parser
const bodyParser = require('body-parser');
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

// transform req body in json
app.use(bodyParser.json());


//middleware route(général)
app.use((req,res,next)=>{

console.log("bienvenue dans Express");
next();

});

  app.use((req,res,next)=>{

    res.status(201).json({message: "je suis dans le status 2 "});

    });


// export app
module.exports = app;
