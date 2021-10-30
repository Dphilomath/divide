const mongoose = require("mongoose"),
    Schema = mongoose.Schema

const FroupSchema = new Schema(
    { 
        name: String,
        participants: [Schema.Types.ObjectId],
        bills: [Schema.Types.ObjectId]
    });
const Group = new mongoose.model("Group", GroupSchema)

module.exports = Group