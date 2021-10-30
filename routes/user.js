const   express = require('express'),
        mongoose = require("mongoose"),
        router = express.Router(),
        User = require("../models/user")

//expects {sender_id, name, phone} name, phone are of the friend to be added
router.post('/add', async (req, res)=>{

    // let existingFriend = await Friend.findOne({phone: req.body.phone}).exec()
    // if(existingFriend!=null){
    //     return res.json({"Error": "Friend already exists"}).end();
    // }

    // let newFriend = new Friend({ name: req.body.name, phone: req.body.phone });
    // newFriend.save(function (err, data) {
    //     if(err) console.log(err)
    //     else return res.json(data)
    // })

    let self = await User.findById(req.body.my_id)
    if(self){
        for(id in self.friends) {
            let phone = await User.findById(id).phone
            if(phone===req.body.phone) return res.json({"Error":"Already a friend"})
        }
        let newFriend = new User({ _id: new mongoose.Types.ObjectId(),
                                    name:req.body.name,
                                    phone: req.body.phone})
        newFriend.save(function (err, data) {
                if(err) console.log(err)
                else res.json(data)
        })
        self.friends.push(newFriend._id)
        self.save(function (err, data) {
            if(err) console.log(err)
            else console.log(data)
        })
    }
    else res.json({"Error":"Invalid ID"})
    
    
})


//expects id
router.get('/', async (req, res)=>{

    // let friendList = await Friend.find({})
    // return res.json(friendList)
    let self = await User.findById(req.body.my_id)
    if(self){
        let friendList = await User.findById(req.body.my_id).populate('friends').exec()
        return res.json(friendList)
    } 
    else res.json({"Error": "User not found"})
    
})


//new user logs in, if record exists send it back, if not, create it
router.post("/newUser", async(req, res)=>{
    let existing = await User.findOne({phone : req.body.phone})
    console.log(req.body)
    if(existing) return res.json(existing)

    let newUser = new User({name: req.body.name, phone: req.body.phone})
    newUser.save(function (err, data) {
        if(err) console.log(err)
        else res.json(data)
    })
    
})

module.exports = router