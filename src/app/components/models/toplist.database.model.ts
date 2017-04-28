var mongoose = require("mongoose");
var aantalWeken = 4;

var toplistSchema = mongoose.Schema({
    _id: String,
    title : String,
    thumbnailurl: String,
    channeltitle : String,
    channelid : String,
    description : String,
    createdAt: { type: Date, expires:  604800 * aantalWeken }
});

var ToplistDatabase = mongoose.model("Toplist", toplistSchema);

module.exports = ToplistDatabase;