/**
 * Created by wladislavcugunov on 19/04/15.
 */
console.log('Get the server starteeeed!');
var express = require('express');
var app = express();
var chat;

app.use(express.static('public'));


app.get('/', function (req, res)
    {
        res.send('Welcome to the Chat, click here to enter: <a href="/public/index.html"> START CHAT</a>');
    });

app.get('/message', function(req, res){
    req.query.message;
    console.log("Message received by Client: ", req.query.message);
});

app.listen(3000);
