const mongoose = require("mongoose"),
        Schema  = mongoose.Schema,
        User = require("./user"),
        Bill = require('./bill')

const BillStatusSchema = new Schema({
    bill_id: {type: Schema.Types.ObjectId, ref: 'Bill'},
    amount: Number,
    billStatus:[{ user_id : Schema.Types.ObjectId, share: Number, active: Boolean }],
        // {   
        //     share: {
        //         type: Number,
        //         default: 0
        //     },
        //     active: {
        //         type: Boolean,
        //         default: true
        //     }
        // }
    // ),
    equalSharing: Boolean 
})

const BillStatus = new mongoose.model("BillStatus", BillStatusSchema)

module.exports = BillStatus