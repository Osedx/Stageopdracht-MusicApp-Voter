var mongoose = require("mongoose");
// amountDays in rating.database must be equal or more
var amountDays = 7;

var playlistSchema = mongoose.Schema({
    _id: String,
    title : String,
    thumbnailurl: String,
    channeltitle : String,
    channelid : String,
    description : String,
    uploader : String,
    uploaderid : String,
    rating : Number,
    createdAt: { type: Date, expires: 86400 * amountDays }
});

var PlaylistDatabase = mongoose.model("Playlist", playlistSchema);

module.exports = PlaylistDatabase;