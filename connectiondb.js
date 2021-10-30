require("dotenv").config()
const mongoose = require("mongoose")

mongoose.connect(process.env.URI,
     {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "divide"
    })
.catch(error => console.error(error))
.then(()=>console.log("Connected to database"))

mongoose.connection.on('error', err => {
    console.log(err);
});