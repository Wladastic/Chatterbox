console.log('Server started!');
var express = require('express');
var app = express();
var chat =[];
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var ChatHistoryModel = mongoose.model('ChatHistory', {username: String , message: String , date: String, clienttime: String });
var UserListModel = mongoose.model('UserList', {username: String, password: String });
/**
 * @module (config)
 * @type {exports}
 */
var config = require('./private/config.js');

var OnlineUsers = [];

var checkUser = function(UsernametoTest) {
            //Not implemented yet,  will need some work until doing so...
            for (i=0 ; i < OnlineUsers.length; i++) {
            if ( OnlineUsers[i] == UsernametoTest ){ return true;}
        }
        OnlineUsers[OnlineUsers.length] = UsernametoTest;
            /* if(new Date().getMinutes % 2 == 0){
             OnlineUsers = [];
             };
             *  */
};

console.log('Server running at "localhost:'+ config.server.port+'"');

app.use(express.static('public'));

app.get('/', function(req,res){

    });

app.get('/joined', function(req, res){
    console.log('Join requested by unidentified Client');
    if(req.query.usernamereq.length) {
        var ChatEntry= new ChatHistoryModel({username: ' ' , message:  req.query.usernamereq  + " has joined the Chat.", clienttime: new Date().getHours()+ ":" + new Date().getMinutes()  });
        ChatEntry.save(function (err, saved) {
            if(err) return console.error(err);
            console.log( "Client identifies himself as " + req.query.usernamereq + " and has joined.");
            getmessages(res);
        });

    }
    else {
        res.send('Server: Please enter a Username and hit "Join"');
    }
});

app.get('/usersonline', function(req, res){
    if(req.query.usernamereq.length){
        checkUser(req.query.usernamereq);
        res.send(OnlineUsers);
    }
});

app.get('/refresh', function(req, res){
    if(req.query.usernamereq.length){

    getmessages(res);
    }
    else{res.send('Server: Please enter a Username and hit "Join"');}
});

app.get('/register', function (req,res){
        //req.query.usernamereq;
        UserListModel.find({}, 'username', function (err, pass) {
            res.send("Username is available.");
            console.log(req.query.registry);
        });
    }

);


app.get('/message', function(req, res){
    //req.query.message;
    console.log("Username: " , req.query.username);
    if (req.query.username === false ) { console.log("Please Enter a Username!")}
    else {
        var ChatEntry = new ChatHistoryModel({message: req.query.message, username:req.query.username  , clienttime: new Date().getHours() + ":" + new Date().getMinutes() });
            ChatEntry.save(function (err, saved) {
                if(err) return console.error(err);
                console.log("Message received from Client->",req.query.username, ":" , req.query.message );
                                   /* if ( (req.query.message).indexOf('Jarvis') >= 0) {
                                        var ChatEntryJarv= new ChatHistoryModel({username: 'Jarvis' , message:  "Yes?" , clienttime: new Date().getHours()+ ":" + new Date().getMinutes()  });
                                        ChatEntryJarv.save(function(err, saved){if(err) return console.error(err); console.log("Jarvis has responded to user.")});
                                    } */
                getmessages(res);
            })
    }

});

var getmessages = function(res){
    ChatHistoryModel.find({}, 'message' & 'clienttime'  &'username' , function (err, messages) {
        res.send(messages);
    });
};

setInterval(function(){ OnlineUsers = []; }, 5000);

app.listen(config.server.port);