var mongoose = require("mongoose");

var playlistSchema = mongoose.Schema({
    _id: String,
    title : String,
    thumbnailurl: String,
    channeltitle : String,
    channelid : String,
    description : String,
    uploader : String,
    uploaderid : String,
    rating : Number
});

var PlaylistDatabase = mongoose.model("Playlist", playlistSchema);

module.exports = PlaylistDatabase;