const mongoose = require("mongoose"),
        Schema  = mongoose.Schema,
        User = require("./user"),
        Bill = require('./bill')

const BillStatusSchema = new Schema({
    bill_id: {type: Schema.Types.ObjectId, ref: 'Bill'},
    amount: Number,
    description: [{   user_id:  { type : Schema.Types.ObjectId, ref:'User' },  share: Number, active: Boolean }],
    equalSharing: Boolean 
})

const BillStatus = new mongoose.model("BillStatus", BillStatusSchema)

module.exports = BillStatus