
console.log('Server started!');
var express = require('express');
var app = express();
var chat =[];
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var ChatHistoryModel = mongoose.model('ChatHistory', { message: String });
/**
 * @module (config)
 * @type {exports}
 */
var config = require('./private/config.js');

console.log("Connect to localhost:"+ config.server.port);

app.use(express.static('public'));

app.get('/', function(req,res){
    res.send(chat);
    });

app.get('/joined', function(req, res){
    req.query.message;
    console.log("Anonymous joined.");
    getmessages(res);
});

app.get('/message', function(req, res){
    req.query.message;
    var ChatEntry= new ChatHistoryModel({message: req.query.message});
    ChatEntry.save(console.log("Saved!"));
    console.log("Message received from Client: ", req.query.message);
    getmessages(res);
});

var getmessages = function(res){
    ChatHistoryModel.find({}, 'message', function (err, docs) {
        //console.log(docs);
        res.send(docs);
    });
};

app.listen(config.server.port);