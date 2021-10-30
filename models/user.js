const mongoose = require("mongoose"),
    Schema = mongoose.Schema

const UserSchema = new Schema(
    { 
        name: String,
        phone: {
            type:Number,
            required: true
        },
        friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    });
const User = new mongoose.model("User", UserSchema)


module.exports = User