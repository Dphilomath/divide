const mongoose = require("mongoose"),
        Schema  = mongoose.Schema,
        User = require("./user")

const BillSchema = new Schema({
    bill_name: String,
    amount: Number,
    date: {
        type: Date,
        default: new Date()
    },
    due_date: Date,
    category: String,
    users: [{ type: Schema.Types.ObjectId, ref: 'User', unique: true }],
    equalSharing: {
        type: Boolean,
        default: true
    }
})

const Bill = new mongoose.model("Bill", BillSchema)

module.exports = Bill