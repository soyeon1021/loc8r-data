require('./locations');
require('./users');


const mongoose = require('mongoose');
var gracefulShutdown;

const dbURL = 'mongodb://127.0.0.1:27017/Loc8r';
//var dbURL = 'mongodb+srv://dbuser:dbuser1234@cluster0.sefqhe7.mongodb.net/Loc8r';

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected',function(){
    console.log('Mongoose connected to ' + dbURL);
});

mongoose.connection.on('error',function(err){
    console.log('Mongoose connected err ' + dbURL);
});

mongoose.connection.on('disconnected',function(){
    console.log('Mongoose disconnected to ' + dbURL);
});

var gracefulShutdown = function (msg, callback){
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
}

process.once('SIGUSR2', function(){
    gracefulShutdown('nodemon restart',function(){
        process.kill(process.pid,'SIGUSR2');
    });
});

process.on('SIGINT', function(){
    gracefulShutdown('app termination shutdown',function(){
        process.exit(0);
    });
});

process.on('SIGTERM', function(){
    gracefulShutdown('Heroku app shutdown',function(){
        process.exit(0);
    });
});