var express = require('express')
var router = express.Router()
const Group = require(".././models/group")

router.post('/add', (req, res)=>{

    Group.findOne({name: req.body.name}, (err, found)=> {
        if(found!=null) {
            return res.json({"Error": "Group already exists"})
        }
        else console.log(err)
    })

    //fix: code after line 10 still runs
    let newGroup = new Group({ name: req.body.name });
    newGroup.save(function (err, data) {
        if(err) console.log(err)
        else return res.json(data)
    })
})


module.exports = router