const express = require("express"),
    connect = require("./connectiondb")

const app = express(),
port = process.env.PORT || 3000

app.use("*", (req, res)=>{
    res.send("hello world");
})
    

app.listen(port, ()=>{
    console.log(`listening at port ${port}`)
})