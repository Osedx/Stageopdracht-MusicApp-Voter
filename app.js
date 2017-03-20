"use strict";

process.env.NODE_ENV = process.env.NODE_ENV || "local";

require("rootpath")();
var express = require("express");
var app = express();
var path = require("path");
var config = require("config/main");
// var proxy = require("app/middleware/proxy");
var compress = require("compression");
var morgan = require("morgan"); // logger
var bodyParser = require("body-parser");
var mongoose = require("mongoose"); //database


app.use(compress());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan("dev"));

 app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
//    res.header("Content-Type", "application/json", "charset": "UTF-8" );
    next();

 });

// Database
var mongoose = require("mongoose");
//mongoose.connect("mongodb://localhost:27017/test");

 process.env.MONGOLAB_URI="mongodb://Osedx:azerty123@ds019624.mlab.com:19624/heroku_469576p2";
 
mongoose.connect(process.env.MONGOLAB_URI, function (error) {
    if (error) console.error(error);
    else console.log("mongo connected");
});

var db = mongoose.connection;
mongoose.Promise = global.Promise;

// Models
var PlaylistDatabase = require("./src/app/components/models/playlist.database.model.ts");
var RatingDatabase = require("./src/app/components/models/rating.database.model.ts");

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to MongoDB");

  // APIs
  // select all
  app.get("/playlist", function(req, res) {
    PlaylistDatabase.find({}, null,  {sort: {"rating": -1 }}, function(err, docs) {
      if(err) return console.error(err);
        console.log(docs);
      res.json(docs);
    });
  });
    
  app.get("/personalvideos/:id", function(req, res) {
    PlaylistDatabase.find({ uploaderid: req.params.id }, null,  {sort: {"rating": -1 }}, function(err, obj) {
      if(err) return console.error(err);
      console.log(obj);
      res.json(obj);
    });
  });

  // count all
  app.get("/playlist/count", function(req, res) {
    PlaylistDatabase.count(function(err, count) {
      if(err) return console.error(err);
      res.json(count);
    });
  });

  // create
  app.post("/playlistitem", function(req, res) {
    console.log(req.body);
    var obj = new PlaylistDatabase(req.body);
    console.log(obj);
    obj.save(function(err, obj) {
      if(err) return console.error(err);
      res.status(200).json(obj);
    });
  });
    
  app.post("/rating", function(req, res) {
    console.log(req.body);
    var obj = new RatingDatabase(req.body);
    console.log(obj);
    obj.save(function(err, obj) {
      if(err) return console.error(err);
      res.status(200).json(obj);
    });
  });    

  // find by id
  app.get("/playlistitem/:id", function(req, res) {
    PlaylistDatabase.findOne({_id: req.params.id}, function(err, obj) {
      if(err) return console.error(err);
      res.json(obj);
    });
  });

  // find by id
  app.get("/rating/:userid/:playlistitemid", function(req, res) {
    RatingDatabase.findOne({"userid": req.params.userid, "playlistitemid": req.params.playlistitemid }, function(err, obj) {
      if(err) return console.error(err);
      console.log(obj);
      res.json(obj);
    });
  });
    
  // update by id
  app.put("/playlistitem/:id", function(req, res) {
    PlaylistDatabase.findOneAndUpdate({_id: req.params.id}, req.body, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    });
  });

  // delete by id
  app.delete("/playlistitem/:id", function(req, res) {
    PlaylistDatabase.findOneAndRemove({_id: req.params.id}, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    });
  });
    
   app.delete("/rating/:id", function(req, res) {
    RatingDatabase.findOneAndRemove({_id: req.params.id}, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    });
  });  
    
   app.delete("/ratings/:playlistitemid", function(req, res) {
    RatingDatabase.remove({playlistitemid: req.params.playlistitemid}, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    });
  });   
    
    // Set static folder
    app.use(express.static(path.join(__dirname, config.server.publicPath)));

    // Load all custom routes
    require("app/routes")(app);

    // Start the server
    app.listen(config.server.port, function() {
        console.log("app listening at http://localhost:%s running in %s mode.", config.server.port, process.env.NODE_ENV); // eslint-disable-line no-console
    });

});

//// Setup dumb proxy
// app.use("/proxy", function(req, res, next) {
//    var options = {
//        target: config.server.proxyBaseUrl + config.server.proxySuffix,
//        changeOrigin: true,
//        headers: {
//            host: config.server.host,
//            apikey: config.server.apikey,
//            tenant: config.server.tenant
//        }
//    };
//
//    proxy(req, res, options);
// });
//
//// Setup proxy for files
// app.use([
//    "/files",
//    "/file",
//    "/" + config.server.proxySuffix + "files",
//    "/" + config.server.proxySuffix + "file"
//],
//    function(req, res, next) {
//        var options = {
//            target: config.server.proxyBaseUrl + config.server.proxySuffix + "files/",
//            changeOrigin: true,
//            headers: {
//                host: config.server.host,
//                apikey: config.server.apikey,
//                tenant: config.server.tenant
//            }
//        };
//
//        proxy(req, res, options);
//    });


exports = module.exports = app;