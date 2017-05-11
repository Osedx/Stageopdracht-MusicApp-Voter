var mongoose = require("mongoose");

var ratingSchema = mongoose.Schema({
    userid: String,
    playlistitemid : String,
    rating: String,
    createdAt: { type: Date, expires: "7d", default: Date.now  }
});

var RatingDatabase = mongoose.model("Rating", ratingSchema);

module.exports = RatingDatabase;