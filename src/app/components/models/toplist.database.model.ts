var mongoose = require("mongoose");
var aantalWeken = 8;

var toplistSchema = mongoose.Schema({
    _id: String,
    title : String,
    thumbnailurl: String,
    channeltitle : String,
    channelid : String,
    description : String,
    createdAt: { type: Date, expires:  aantalWeken * 7 + "d", default: Date.now }
});

var ToplistDatabase = mongoose.model("Toplist", toplistSchema);

module.exports = ToplistDatabase;