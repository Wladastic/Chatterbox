
console.log('Get the server starteeeed!');
var express = require('express');
var app = express();
var chat =[];
/**
 * @module (config)
 * @type {exports}
 */
var config = require('./private/config.js');


console.log(config.server.port);

app.use(express.static('public'));

app.get('/', function(req,res){
    res.send(chat);
    });

app.get('/joined', function(req, res){
    req.query.message;
    console.log("Anonymous joined.");
    chat.push('Anynous joined Chat.');
    res.send(chat);
});

app.get('/message', function(req, res){
    req.query.message;
    console.log("Message received from Client: ", req.query.message);
    chat.push(req.query.message);
    res.send(chat);
});


app.listen(config.server.port);