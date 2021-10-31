var express = require('express'),
mongoose = require('mongoose')
var router = express.Router()
const Bill = require(".././models/bill"),
    User = require(".././models/user"),
    BillStatus = require(".././models/billStatus")



router.get('/', async(req, res)=>{
    let billList = await Bill.find({}).populate('users').exec()
    if(billList) return res.json(billList)
    else res.json("Error: No bills found")
})


router.get('/:user_id', async(req, res)=>{
    let billList = await User.findById(req.params.user_id).populate('bills').exec()
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


router.post('/addBill', async (req, res)=>{
    let {bill_name, amount, due_date, category, user_id} = req.body

    try{
        let existingBill = await Bill.findOne({bill_name: bill_name}).exec()
        if(existingBill!=null){
            return res.json({"Error": "Bill with the same name already exists"}).end();
        }

        let newBill = new Bill({ 
            _id: new mongoose.Types.ObjectId(),
            bill_name: bill_name,
            amount: amount,
            category: category,
            due_date: new Date(due_date) 
        });
        console.log("data")
        newBill.users.push(user_id)
        newBill.save(function (err, data) {
            if(err) console.log(err)
            else{
                 res.json(data)
                 console.log(data)
            }
        })  
        //initialise billStatus as well
        let newBillStatus = new BillStatus({ bill_id: newBill._id, amount: amount});
        newBillStatus.description.push({user_id, share: 0, active: true})
        newBillStatus.save(function (err, data) {
            if(err) console.log(err)
            else console.log(data)
        })  

    }catch(error){
        console.log(error);
        return res.json(error)
    }   
})

// // expecting {friend_id, name, phone}
// router.post('/:bill_name/addUser', async (req, res)=>{

//     let bill_name =  req.params.bill_name;
//     var bill = await Bill.findOne({name: bill_name}).exec()
    
//     const { friend_id, name, phone } = req.body;

//     try{ 
//         // User.findById(id, (err, found)=>{
//         //     if(err) console.log(err)
//         //     else if(found) {
//         //         bill.users.push(id)
//         //     }
//         //     else return res.json({"Error" : "user_id invalid"})
//         //     bill.save((err, data)=> {
//         //         if(err) {
//         //             console.log(err)
//         //             res.status(500).json({"Error": "Request failed"})
//         //         }
//         //         else{
//         //             console.log(data)
//         //             return res.json(data)
//         //         }
//         //     });
//         // }) 

//         bill.users.push(friend_id)
//         bill.save((err, data)=> {
//             if(err) {
//                 console.log(err)
//                 res.status(500).json({"Error": "Request failed"})
//             }
//             else{
//                 console.log(data)
//                 return res.json(data)
//             }
//         });
//         let billStatus = await BillStatus.find({bill_id: bill._id})
//         let newBillStatus = {user_id : friend_id, share: 0, active: true }
//         billStatus.billStatus.push(newBillStatus)
//         billStatus.save((err, saved)=>{
//             if(err) console.log(err)
//             else console.log(saved)
//         })


//     }catch(error){
//         return res.json(error)
//     }
    
// })

// expecting {friend_id, bill_id}
router.post('/:bill_id/addUser', async (req, res)=>{

    const { friend_id } = req.body;
    const bill_id = req.params.bill_id
    
    var bill = await Bill.findById(bill_id).exec()
    
    
    try{ 
        // User.findById(id, (err, found)=>{
        //     if(err) console.log(err)
        //     else if(found) {
        //         bill.users.push(id)
        //     }
        //     else return res.json({"Error" : "user_id invalid"})
        //     bill.save((err, data)=> {
        //         if(err) {
        //             console.log(err)
        //             res.status(500).json({"Error": "Request failed"})
        //         }
        //         else{
        //             console.log(data)
        //             return res.json(data)
        //         }
        //     });
        // }) 
        if(bill.users.indexOf(friend_id)>-1) return res.json({"Error":"Already added"})


        bill.users.push(friend_id)
        let saved = await bill.save()
        // bill.save((err, data)=> {
        //     if(err) {
        //         console.log(err)
        //         res.status(500).json({"Error": "Request failed"})
        //     }
        //     else{
        //         console.log(data)
        //         res.json(data)
        //     }
        // });
        User.findById(friend_id, (err, found)=>{
            if(err) console.log(err)
            else{
                found.bills.push(bill_id)
                found.save(err, saved=>{
                    if(err) console.log(err)
                    else console.log(saved)
                })
            }
        })
        res.json(saved)
        let billStatus = await BillStatus.findOne({bill_id: bill_id})
        console.log(billStatus)
        let newBillStatus = {user_id : friend_id, share: 0, active: true }
        billStatus.description.push(newBillStatus)
        billStatus.save((err, saved)=>{
            if(err) console.log(err)
            else console.log(saved)
        })


    }catch(error){
        console.log(error)
        return res.status(420).json(error)
    }
    
})
router.get("/splitBill", async(req, res)=>{
    //expecting { bill_id, equal: true/false, shares: { id1: share%1, id2: share%2....} }
    let bill = await BillStatus.find({bill_id: req.body.bill_id})
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