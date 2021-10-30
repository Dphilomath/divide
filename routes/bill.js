var express = require('express'),
mongoose = require('mongoose')
var router = express.Router()
const Bill = require(".././models/bill"),
    User = require(".././models/user"),
    BillStatus = require(".././models/billStatus")



router.get('/', async(req, res)=>{
    let billList = await Bill.find({})
    if(billList) return res.json(billList)
    else res.json("Error: No bills found")
})

router.get("/:name", async (req, res)=>{
    let billName = req.params.name

    if(billName) {
        let response = await Bill.findOne({name: billName})
        if(response) res.json(response)
        else res.json({"Error":"Not Found"})
    }
})


router.post('/add', async (req, res)=>{

    try{
        let existingBill = await Bill.findOne({name: req.body.name}).exec()
        if(existingBill!=null){
            return res.json({"Error": "Bill with the same name already exists"}).end();
        }

        let newBill = new Bill({ ...req.body, date: new Date(req.body.date), due_date: new Date(req.body.due_date) });
        newBill.save(function (err, data) {
            if(err) console.log(err)
            else res.json(data)
        })  
        //initialise billStatus as well
        let newBillStatus = new BillStatus({ bill_id: newBill._id, amount: req.body.amount});
        newBillStatus.save(function (err, data) {
            if(err) console.log(err)
            else console.log(data)
        })  

    }catch(error){
        return res.json(error)
    }   
})


router.post('/:bill_name/addUser', async (req, res)=>{

    let bill_name =  req.params.bill_name;
    var bill = await Bill.findOne({name: bill_name}).exec()
    
    const { id, name, phone } = req.body;

    try{ 
        User.findById(id, (err, found)=>{
            if(err) console.log(err)
            else if(found) {
                bill.users.push(id)
            }
            else return res.json({"Error" : "user_id invalid"})
            bill.save((err, data)=> {
                if(err) {
                    console.log(err)
                    res.status(500).json({"Error": "Request failed"})
                }
                else{
                    console.log(data)
                    return res.json(data)
                }
            });
        })   

    }catch(error){
        return res.json(error)
    }
    
})

router.get("/splitBill",async(req, res)=>{
    //expecting { bill_id, equal: true/false, shares: { id1: share%1, id2: share%2....} }
    let bill = await BillStatus.findById(req.body.bill_id)
    if(req.body.equal){
        for(id in req.body.shares){
            Bill.updateOne({_id: id}, {})
        }
    }
    const shares = req.body
})



module.exports = router


// User.findOne({phone}, (err, found)=>{
//     if(err) console.log(err)
//     else if(found != null){
//         bill.users.push(found._id)
//     }else{
// let newFriend = new User({
//     name: name,
//     phone: phone,
//     _id: new mongoose.Types.ObjectId()
// })
// console.log("reached here")
// newFriend.save(newFriend, (err, saved)=>{
//     if(err) console.log(err)
//     else console.log("saved",saved)
// })
// console.log(bill.users)
// bill.users.push(newFriend._id)
// console.log(bill.users)
// }
// bill.save((err, data)=> {
// if(err) {
//     console.log(err)
//     res.status(500).json({"Error": "Request failed"})
// }
// else{
//     console.log(data)
//     return res.json(data)
// }

// });

// })