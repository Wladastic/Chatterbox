
console.log('Server started!');
var express = require('express');
var app = express();
var chat =[];
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var ChatHistoryModel = mongoose.model('ChatHistory', {username: String , message: String , date: Date});
var UserListModel = mongoose.model('UserList', {username: String, password: String });
/**
 * @module (config)
 * @type {exports}
 */
var config = require('./private/config.js');

console.log('Server running at "localhost:'+ config.server.port+'"');

app.use(express.static('public'));

app.get('/', function(req,res){

    });

app.get('/joined', function(req, res){
    console.log(req.query.usernamereq + ' requested.');
    if(req.query.usernamereq.length) {

        var ChatEntry= new ChatHistoryModel({username: 'Server' ,message: req.query.usernamereq + " joined.", date: new Date().getHours()  });
        ChatEntry.save(function (err, saved) {
            if(err) return console.error(err);
            console.log( req.query.usernamereq + " joined.");
            getmessages(res);
        })

    }
    else {
        res.send('Server: Please enter a Username and hit "Join"');
    }

});

app.get('/refresh', function(req, res){
    if(req.query.usernamereq.length){
    getmessages(res);
    }
    else{res.send('Server: Please enter a Username and hit "Join"');}
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
        var ChatEntry= new ChatHistoryModel({message: req.query.message, username:req.query.username  , date: new Date() });
            ChatEntry.save(function (err, saved) {
                if(err) return console.error(err);
                console.log("Message received from Client->",req.query.username, ":" , req.query.message );
                getmessages(res);
            })
    }

});

var getmessages = function(res){
    ChatHistoryModel.find({}, 'message' & 'date' &'username' , function (err, messages) {
        res.send(messages);
    });
};


app.listen(config.server.port);