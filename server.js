//import module http
const http= require('http');

// import express
const app = require("./app");

//import .dotenv
const dotenv = require('dotenv');

//app create port / server listen on port 3000
app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.listen( process.env.PORT || 3000);
