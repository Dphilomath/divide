const express = require("express"),
    connect = require("./connectiondb");
const { user, group, bill, category, billStatus }  = require("./routes/index")

const app = express(),
port = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get("/", (req, res)=>{
    res.send("API is up & running");
})

app.use('/users', user)
app.use('/groups', group)
app.use('/bills', bill)
app.use('/billStatus', billStatus)
app.use('/categories', category)

app.listen(port, ()=>{
    console.log(`listening at port ${port}`)
})