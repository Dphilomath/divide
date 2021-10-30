const mongoose = require("mongoose"),
    Schema  = new mongoose.Schema

const BillSchema = new Schema({name: String, amount: Number, date: Date})

const Bill = new mongoose.model("Bill", BillSchema)

module.exports = Bill