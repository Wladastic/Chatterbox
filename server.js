
console.log('Server started!');
var express = require('express');
var app = express();
var chat =[];
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var ChatHistoryModel = mongoose.model('ChatHistory', { message: String , date: String});
var UserListModel = mongoose.model('UserList', {username: String, password: String });
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

app.get('/register', function (req,res){
        req.query.usernamereq;
        UserListModel.find({}, 'username', function (err, pass) {
            res.send("Username is available.");
            console.log(req.query.registry);
        });
    }

);



app.get('/message', function(req, res){
    req.query.message;
    console.log("Username: " , req.query.username);
    if (req.query.username === false ) { console.log("Please Enter a Username!")}
    else {
        var ChatEntry= new ChatHistoryModel({message: "[" + new Date().getHours()+ ":" + new Date().getMinutes()+ "]"+ req.query.username + ": " + req.query.message, date: new Date() });
            ChatEntry.save(function (err, saved) {
                if(err) return console.error(err);
                console.log("Message received from Client:",req.query.username, ":" , req.query.message /* , ChatEntry.date*/);
                getmessages(res);
            })
    }

});

var getmessages = function(res){
    ChatHistoryModel.find({}, 'message', function (err, messages) {
        res.send(messages );
    });
};


app.listen(config.server.port);