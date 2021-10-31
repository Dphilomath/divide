const   express = require('express'),
        mongoose = require("mongoose"),
        router = express.Router(),
        User = require("../models/user")


//expects user_id, friend's phone number as {user_id, phone}
router.post("/addFriend/:user_id", async(req, res)=>{
    const {phone} = req.body
    const self = await User.findById(req.params.user_id) 
    let friend = await User.findOne({phone: phone})

    try{
        if(friend){
            for(id of self.friends) {
                
                let friend = await User.findById(id)
                if(friend.phone==phone) return res.json({"Error" : "Already a friend"})
            }
            self.friends.push(friend._id)
            self.save( async(err, data) => {
                if(err) console.log(err)
                else {
                    let response = await data.populate('friends')
                    res.json(response)
                    console.log(data)
                }
            })
        }else res.json({"Error": "usko bhi bol app use krne, register karega tabhi idhar add hoga"})
    }catch(err){
        console.log(err)
        res.status(420).json(err)
    }
    
})


//expects user_id
router.get('/details/:user_id', async (req, res)=>{

    let self = await User.findById(req.params.user_id)
    if(self){
        let friendList = await User.findById(req.params.user_id)
        .populate('bills').populate('friends').exec()
        console.log(friendList)
        return res.json(friendList)
    } 
    else res.json({"Error": "User not found"})
    
})


//new user logs in, if record exists, sends it back, if not, creates it
router.post("/newUser", async(req, res)=>{
    let existing = await User.findOne({phone : req.body.phone})
    if(existing) return res.json(existing)

    let newUser = new User(req.body)
    newUser.save(function (err, data) {
        if(err) console.log(err)
        else res.json(data)
    })
    
})

module.exports = router

//expects {user_id_id, name, phone} name, phone are of the friend to be added

// router.post('/addFriend', async (req, res)=>{

//     // let existingFriend = await Friend.findOne({phone: req.body.phone}).exec()
//     // if(existingFriend!=null){
//     //     return res.json({"Error": "Friend already exists"}).end();
//     // }

//     // let newFriend = new Friend({ name: req.body.name, phone: req.body.phone });
//     // newFriend.save(function (err, data) {
//     //     if(err) console.log(err)
//     //     else return res.json(data)
//     // })

//     let self = await User.findById(req.body.user_id)
//     if(self){
//         for(id in self.friends) {
//             let phone = await User.findById(id).phone
//             if(phone===req.body.phone) return res.json({"Error" : "Already a friend"})
//         }
//         let newFriend = new User(
//             { _id: new mongoose.Types.ObjectId(),
//                 name:req.body.name,
//                 phone: req.body.phone
//             })
//         newFriend.save(function (err, data) {
//                 if(err) console.log(err)
//                 else res.json(data)
//         })
//         self.friends.push(newFriend._id)
//         self.save(function (err, data) {
//             if(err) console.log(err)
//             else console.log(data)
//         })
//     }
//     else res.json({"Error" : "Invalid ID"})
// })