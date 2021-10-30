const mongoose = require("mongoose"),
Schema = mongoose.Schema

const CategorySchema = new Schema({category: String})

const Category = new mongoose.model("Category", CategorySchema)

module.exports = Category