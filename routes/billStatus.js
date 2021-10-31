var express = require('express'),
mongoose = require('mongoose')
var router = express.Router()
const Bill = require(".././models/bill"),
    User = require(".././models/user"),
    BillStatus = require(".././models/billStatus")


//expects {bill_id, user_id}
router.get("/", async(req, res)=>{
    try{
        console.log("gffd")
        const { bill_id, user_id } = req.body
        console.log(bill_id, user_id)

        let billStatus = await BillStatus.findOne({bill_id: bill_id}).populate('description')
        console.log(billStatus)
        let userStatus = billStatus.description.find((desc, index)=>{
            if(desc.user_id===user_id) return true;
        })

        if(userStatus) res.json(userStatus)
        else res.status(404)
    }catch(err){
        res.status(404)
    }
    
    
})

module.exports = router