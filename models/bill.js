const mongoose = require("mongoose"),
        Schema  = mongoose.Schema,
        User = require("./user")

const BillSchema = new Schema({
    bill_name: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    amount: Number,
    date: {
        type: Date,
        default: new Date()
    },
    due_date: Date,
    category: String,
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    equalSharing: {
        type: Boolean,
        default: true
    },
    count: {type: Number, default: 0}
})

const Bill = new mongoose.model("Bill", BillSchema)

module.exports = Bill