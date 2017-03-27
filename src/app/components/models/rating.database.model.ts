var mongoose = require("mongoose");
var amountDays = 7;

var ratingSchema = mongoose.Schema({
    userid: String,
    playlistitemid : String,
    rating: String,
    expire_at: {type: Date, default: Date.now, expires: 86400 * amountDays}
});

var RatingDatabase = mongoose.model("Rating", ratingSchema);

module.exports = RatingDatabase;