var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  role: String
});

userSchema.pre("save", function(next){
    this.role = "user";
    next();
});

var UserDatabase = mongoose.model("User", userSchema);

module.exports = UserDatabase;
