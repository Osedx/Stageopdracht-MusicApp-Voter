"use strict";

process.env.NODE_ENV = process.env.NODE_ENV || "local";

require("rootpath")();
var express = require("express");
var app = express();
var http = require("http");
var server = http.createServer(app);
var path = require("path");
var config = require("config/main");
// var proxy = require("app/middleware/proxy");
var compress = require("compression");
var morgan = require("morgan"); // logger
var bodyParser = require("body-parser");
var mongoose = require("mongoose"); //database
var cors = require("cors"); //middleware
var io = require("socket.io").listen(server);

app.use(compress());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//app.use(morgan("dev"));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    //    res.header("Content-Type", "application/json", "charset": "UTF-8" );
    next();
});

var admin = require("firebase-admin");

var serviceAccount = require("src/app/providers/serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
        //  databaseURL: "https://district01-musicapp.firebaseio.com"
});

// Connecting database

//mongoose.connect("mongodb://localhost:27017/test");

process.env.MONGOLAB_URI = "mongodb://Osedx:azerty123@ds019624.mlab.com:19624/heroku_469576p2";

mongoose.connect(process.env.MONGOLAB_URI, function (error) {
    if (error) console.error(error);
    else console.log("mongo connected");
});

var db = mongoose.connection;
mongoose.Promise = global.Promise;

// Models
var PlaylistDatabase = require("./src/app/components/models/playlist.database.model.ts");
var ToplistDatabase = require("./src/app/components/models/toplist.database.model.ts");
var RatingDatabase = require("./src/app/components/models/rating.database.model.ts");
var UserDatabase = require("./src/app/components/models/user.database.model.ts");

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connected to MongoDB");

    // APIs
    // get playlist
    app.get("/api/playlist", function (req, res) {
        PlaylistDatabase.find({}, null, {
            sort: {
                "rating": -1
            }
        }, function (err, docs) {
            if (err) return console.error(err);
            res.json(docs);
        });
    });
    // get toplist
    app.get("/api/toplist", function (req, res) {
        ToplistDatabase.find({}, null, function (err, docs) {
            if (err) return console.error(err);
            res.json(docs);
        });
    });
    // get users
    app.get("/api/users/:id", function (req, res) {
        admin.auth().verifyIdToken(req.params.id)
            .then(function (decodedToken) {
                var uid = decodedToken.uid;
                UserDatabase.findOne({
                    "_id": uid
                }, function (err, obj) {
                    console.log(obj);
                    if (obj.role === "admin") {
                        UserDatabase.find({}, null, function (err, docs) {
                            if (err) return console.error(err);
                            res.json(docs);
                        });
                    }
                });
            }).catch(function (error) {
                // Handle error
            });
    });

    // get videolist of user
    app.get("/api/personalvideos/:id", function (req, res) {
        PlaylistDatabase.find({
            uploaderid: req.params.id
        }, null, {
            sort: {
                "rating": -1
            }
        }, function (err, obj) {
            if (err) return console.error(err);
            res.json(obj);
        });
    });
    
    // get blocked status of user
    app.get("/api/userstatus/:tokenid/:id", function (req, res) {
        admin.auth().verifyIdToken(req.params.tokenid)
            .then(function (decodedToken) {
                var uid = decodedToken.uid;
                UserDatabase.findOne({
                    "_id": uid
                }, function (err, obj) {
                    if (err) return console.error(err);
                    if (obj.role === "admin") {
                        admin.auth().getUser(req.params.id)
                          .then(function(userRecord) {
                            console.log(userRecord);
                            res.status(200).json(userRecord.disabled);
                            console.log("Successfully fetched user data:", userRecord.disabled);
                          })
                          .catch(function(error) {
                            console.log("Error fetching user data:", error);
                        });
                    }
                });
            }).catch(function (error) {
                return console.error(error);
        });
    });

    // count all
    app.get("/api/playlist/count", function (req, res) {
        PlaylistDatabase.count(function (err, count) {
            if (err) return console.error(err);
            res.json(count);
        });
    });

    // count all
    app.get("/api/toplist/count", function (req, res) {
        ToplistDatabase.count(function (err, count) {
            if (err) return console.error(err);
            res.json(count);
        });
    });

    // create playlistitem
    app.post("/api/playlistitem", function (req, res) {
        var obj = new PlaylistDatabase(req.body);
        obj.save(function (err, obj) {
            if (err) return console.error(err);
            res.status(200).json(obj);
        });
    });

    // create toplistitem
    app.post("/api/toplistitem", function (req, res) {
        var obj = new ToplistDatabase(req.body);
        obj.save(function (err, obj) {
            if (err) return console.error(err);
            res.status(200).json(obj);
        });
    });

    // create user
    app.post("/api/user/:idtoken", function (req, res) {
        admin.auth().verifyIdToken(req.params.idtoken)
            .then(function (decodedToken) {
                if (req.body._id === decodedToken.uid) {
                    var obj = new UserDatabase(req.body);
                    obj.save(function (err, obj) {
                        if (err) return console.error(err);
                        res.status(200).json(obj);
                    });
                }
            }).catch(function (error) {
                // Handle error
            });
    });

    // create user in firebase
    app.post("/api/userfirebase/", function (req, res) {
        admin.auth().verifyIdToken(req.body.id)
            .then(function (decodedToken) {
                var uid = decodedToken.uid;
                UserDatabase.findOne({
                    "_id": uid
                }, function (err, obj) {
                    if (err) return console.error(err);
                    else if (obj.role === "admin") {
                        console.log(req.body.name);
                        console.log(req.body.email);
                        console.log(req.body.password);
                        admin.auth().createUser({
                            email: req.body.email,
                            displayName: req.body.name,
                            password: req.body.password
                        }).then(function (userRecord) {
                            var obj = new UserDatabase({
                                "_id": userRecord.uid,
                                "name": userRecord.displayName,
                                "email": userRecord.email
                            });
                            obj.save(function (err, obj) {
                                if (err) return console.error(err);
                                res.status(200).json(obj);
                            });
                        }).catch(function (error) {
                            res.status(500).send(error);
                        });
                    }
                });
            });
    });

    // create rating
    app.post("/api/rating", function (req, res) {
        var obj = new RatingDatabase(req.body);
        obj.save(function (err, obj) {
            if (err) return console.error(err);
            res.status(200).json(obj);
        });
    });

    // find playlistitem by id
    app.get("/api/playlistitem/:id", function (req, res) {
        PlaylistDatabase.findOne({
            _id: req.params.id
        }, function (err, obj) {
            if (err) return console.error(err);
            res.json(obj);
        });
    });

    // find rating by id of user & playlistitem
    app.get("/api/rating/:userid/:playlistitemid", function (req, res) {
        RatingDatabase.findOne({
            "userid": req.params.userid,
            "playlistitemid": req.params.playlistitemid
        }, function (err, obj) {
            if (err) return console.error(err);
            res.json(obj);
        });
    });
    
    // find ratings by id of user
    app.get("/api/ratings/:userid", function (req, res) {
        RatingDatabase.find({
            "userid": req.params.userid,
        }, function (err, obj) {
            if (err) return console.error(err);
            res.json(obj);
        });
    });

    // find user with role
    app.get("/api/user/:id", function (req, res) {
        admin.auth().verifyIdToken(req.params.id)
            .then(function (decodedToken) {
                var uid = decodedToken.uid;
                UserDatabase.findOne({
                    "_id": uid
                }, function (err, obj) {
                    if (err) return console.error(err);
                    res.json(obj);
                });
            }).catch(function (error) {
                // Handle error
        });
    });
    // update by id
    app.put("/api/playlistitem/:id", function (req, res) {
        PlaylistDatabase.findOneAndUpdate({
            _id: req.params.id
        }, req.body, function (err) {
            if (err) return console.error(err);
            res.sendStatus(200);
        });
    });

    //update user
    app.put("/api/user/:tokenid/:id", function (req, res) {
        console.log(req.body);
        console.log(req.params.id);
        admin.auth().verifyIdToken(req.params.tokenid)
            .then(function (decodedToken) {
                var uid = decodedToken.uid;
                UserDatabase.findOne({
                    "_id": uid
                }, function (err, obj) {
                    if (err) return console.error(err);
                    if (obj.role === "admin") {
                        admin.auth().updateUser(req.params.id, {
                            displayName: req.body.name,
                        }).then(function (userRecord) {
                            UserDatabase.findOneAndUpdate({
                                _id: req.params.id
                            }, req.body, function (err, obj) {
                                if (err) return console.error(err);
                                console.log("succesfully updated" + obj);
                                res.sendStatus(200);
                            });
                        }).catch(function(error) {
                            console.log("Error updating user:", error); });
                    }
                });
            }).catch(function (error) {
                // Handle error
        });
    });

    // update user blocked status
    app.put("/api/userstatus/:tokenid/:id", function (req, res) {
        console.log(req.body);
        admin.auth().verifyIdToken(req.params.tokenid)
            .then(function (decodedToken) {
                var uid = decodedToken.uid;
                UserDatabase.findOne({
                    "_id": uid
                }, function (err, obj) {
                    if (err) return console.error(err);
                    if (obj.role === "admin") {
                        admin.auth().updateUser(req.params.id, {
                            disabled: req.body.disabled,
                        }).then(function (userRecord) {
                            console.log(userRecord);
                           res.sendStatus(200);
                        }).catch(function(error) {
                            return console.log("Error updating user:", error); });
                    }
                });
            }).catch(function (error) {
                return console.error(error);
        });
    });    
    
    // delete by id
    app.delete("/api/playlistitem/:id", function (req, res) {
        PlaylistDatabase.findOneAndRemove({
            _id: req.params.id
        }, function (err) {
            if (err) return console.error(err);
            res.sendStatus(200);
        });
    });

    app.delete("/api/user/:tokenid/:id", function (req, res) {
        admin.auth().verifyIdToken(req.params.tokenid)
            .then(function (decodedToken) {
                var uid = decodedToken.uid;
                UserDatabase.findOne({
                    "_id": uid
                }, function (err, obj) {
                    if (obj.role === "admin") {
                UserDatabase.findOneAndRemove({
                    _id: req.params.id
                }, function (err) {
                    if (err) return console.error(err);
                    admin.auth().deleteUser(req.params.id)
                        .then(function () {
                            res.sendStatus(200);
                            console.log("Successfully deleted user");
                        })
                        .catch(function (error) {
                            console.log("Error deleting user:", error);
                    });
                });
        }});
    });
    });

    app.delete("/api/rating/:id", function (req, res) {
        RatingDatabase.findOneAndRemove({
            _id: req.params.id
        }, function (err) {
            if (err) return console.error(err);
            res.sendStatus(200);
        });
    });

    app.delete("/api/ratings/:playlistitemid", function (req, res) {
        RatingDatabase.remove({
            playlistitemid: req.params.playlistitemid
        }, function (err) {
            if (err) return console.error(err);
            res.sendStatus(200);
        });
    });

    // Set static folder
    app.use(express.static(path.join(__dirname, config.server.publicPath)));

    // Load all custom routes
    require("app/routes")(app);

});

// Start the server
server.listen(process.env.PORT || 3016, function () {
    console.log("app listening at http://localhost:%s running in %s mode.", process.env.PORT || 3016, process.env.NODE_ENV); // eslint-disable-line no-console
});

//io.set("origins", "*:*");

io.sockets.on("connection", function (socket) {
    console.log("New user connected: " + socket.id);
    socket.on("disconnect", function () {
        console.log("The user is disconnected");
    });
    socket.on("updateplaylist", function (id) {
        socket.broadcast.emit("playlistisupdated", id);
    });
    socket.on("deletefromplaylist", function (id) {
        socket.broadcast.emit("itemdeleted", id);
    });
});

exports = module.exports = app;