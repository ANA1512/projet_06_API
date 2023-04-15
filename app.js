// Import d'express (gestion des req/rep)
const express =require('express');

//creation  app express
const app=express();

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
