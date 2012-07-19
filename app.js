var express = require('express');
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
var app = express.createServer();

app.configure(function(){
  app.use(express.logger());
  app.set('port', process.env.PORT || 3000);
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public', { maxAge: 86400}));
});

// Run on port 80 when in production mode
app.configure('production', function(){
  app.use(express.errorHandler()); 
    app.set('port', process.env.PORT || 80);
});

app.listen(app.set('port'));

var nowjs = require("now");
var everyone = nowjs.initialize(app);

var players = {};
var playersNumber = 0;

everyone.now.sendName = function(){
  players[this.user.clientId] = {name:this.now.name};
  playersNumber++;
  this.now.setPlayerid(this.user.clientId);
  console.log("Added "  + lastAddedPlayer);
  everyone.now.receivePlayer({id:this.user.clientId, name:this.now.name});
};

