require("dotenv").config()
const mongoose = require("mongoose")

mongoose.connect(process.env.URI, {dbName: "divide"})
.catch(error => handleError(error))
.then(()=>console.log("Connected to database"))

mongoose.connection.on('error', err => {
    console.log(err);
});