const mongoose = require("mongoose"),
    Schema = mongoose.Schema

const FriendSchema = new Schema(
    { 
        name: String,
        age: Number,
        sex: Enumerator("M", "F")
    });
const Friend = new mongoose.model("Friend", FriendSchema)

const newFriend = new Friend({ name: req.body.name, age: req.body.age, sex: req.body.sex });
newFriend.save(function (err) {
  if (err) return console.log(err)
});

module.exports = Friend