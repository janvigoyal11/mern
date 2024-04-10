const express=require('express')
const router=express.Router()
const Order=require('../models/Orders')

router.post('/orderData', async (req, res) => {
    if (!req.body.email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    let data = req.body.order_data || [];
    // await data.splice(0,0,{Order_date: req.body.order_date});
    data.unshift({Order_date: req.body.order_date });

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email }); 

    if (eId===null){
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            res.send("Server Error: ", error)
        }
    }
    else {
        try {
            await Order.findOneAndUpdate({'email' :req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            res.send("Server Error", error)
        }
    }
})

router.post('/myOrderData', async (req, res) => {
    try{
        let myData = await Order.findOne({'email': req.body.email});
        res.json({orderData: myData});
    } catch(error){
        res.send("Server Error", error);
    }
})

module.exports=router;