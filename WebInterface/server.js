const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const config = require('./config/database');

mongoose.connect(config.database);
mongoose.connection.on('connected',function () {
  console.log("Connencted to " + config.database);
})

var server = express();

const api = require('./routes/api');

//Damit Zugriff erlaubt/verweigert werden kann.
server.use(cors());

//Angular Client
server.use(express.static(path.join(__dirname,'client')));

//Um auf die POST "Daten" zugreifen zu können.
server.use(bodyparser.json());

server.use('/api', api)


server.listen(3000,function () {
  console.log("Server gestartet -> Port 3000");
})

server.get('/',function (req,res) {
  res.send("NodeJS Server");
})
