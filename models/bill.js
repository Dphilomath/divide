const mongoose = require("mongoose"),
        Schema  = mongoose.Schema,
        User = require("./user")

const BillSchema = new Schema({
    name: String,
    amount: Number,
    date: Date,
    due_date: Date,
    category: String,
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    equalSharing: Boolean 
})

const Bill = new mongoose.model("Bill", BillSchema)

module.exports = Bill