var mongoose = require("mongoose");

var ratingSchema = mongoose.Schema({
    userid: String,
    playlistitemid : String,
    rating: String,
});

var RatingDatabase = mongoose.model("Rating", ratingSchema);

module.exports = RatingDatabase;