const express=require('express')
const router=express.Router()

router.post('/foodData',(req,resp)=>{
    try{
        resp.send([global.food_items,global.foodCategory]);
    } catch(err){
        console.error(err.message);
        resp.send("Error!");
    }
})

module.exports=router;