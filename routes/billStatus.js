var express = require('express'),
    mongoose = require('mongoose')
var router = express.Router()
const Bill = require(".././models/bill"),
    User = require(".././models/user"),
    BillStatus = require(".././models/billStatus")


//expects {bill_id, user_id} where user_id is optional, if provided, return the bill status associated with user
//else return billStatus with bill_id=bill_id
router.get("/", async (req, res) => {
    try {
        const { bill_id, user_id } = req.body
        var result = []
        if (user_id) {
            result = await BillStatus.find({ user_id: user_id })
        }
        else {
            result = await BillStatus.find({ bill_id: bill_id })
        }

        if (result) res.json(result)
        else res.status(404)
    } catch (err) {
        res.status(404)
    }

    //expects {user_id, bill_id, equalSharing:t/f, share: [{id: user_id, share: share%}]}
    router.post("/update", async (req, res) => {
        try {
            const { user_id, bill_id, equalSharing, shares } = req.body
            //console.log(req.body)
            let bill = await Bill.findById(bill_id)
            let amount = bill.amount
            let share = 100
            // if (user_id != bill.owner) return res.json({ "Error": "You are not authorized to update shares" })

            if (equalSharing) {
                let count = bill.count
                share = share / count
            }

            let users = bill.users

            for (id of users) {
                let tempBillStatus = await BillStatus.findOne({ bill_id: bill_id, user_id: id })
                if (!equalSharing) {
                    for (var i = 0; i < shares.length; i++) {
                        if (shares[i].id == id) {
                            share = shares[i].share
                            break
                        }
                    }
                }

                tempBillStatus.share = amount * share / 100

                tempBillStatus.save(async (err, saved) => {
                    if (err) {
                        console.log(err)
                        return res.json(err)
                    }
                    else console.log(saved)
                })
            }
            res.status(200).json({"Success":"Update Successful"}).end()
            
        } catch (err) {
            console.log(err)
            res.status(420).json(err)
        }
    })
})

module.exports = router