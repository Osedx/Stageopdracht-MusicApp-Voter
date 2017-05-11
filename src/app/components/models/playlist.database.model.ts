var mongoose = require("mongoose");
// amountDays in rating.database must be equal or more

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
    createdAt: { type: Date, expires: "7d", default: Date.now  }
});

var PlaylistDatabase = mongoose.model("Playlist", playlistSchema);

module.exports = PlaylistDatabase;