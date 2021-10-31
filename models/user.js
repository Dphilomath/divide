const mongoose = require("mongoose"),
    Bill = require('./bill')
    Schema = mongoose.Schema

const UserSchema = new Schema(
    { 
        name: String,
        phone: {
            type:Number,
            required: true
        },
        friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        bills: [{ type: Schema.Types.ObjectId, ref: 'Bill'}],
        upi_id: {
            type: String,
            required: true
        }
    });
const User = new mongoose.model("User", UserSchema)


module.exports = User