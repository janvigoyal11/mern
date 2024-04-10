const express=require('express')
const router=express.Router()
const user=require('../models/User')
const { body, validationResult } = require('express-validator');

const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const jwtSecret="MyNameIsDaisyAggarwal!#";

router.post("/CreateUser",
[
body('email','Incorrect Email ID Format').isEmail(),          // email format
body('name','Incorrect Name Format').isLength({min:5}),   // minimum length 5
body('password','Incorrect Password Format').isLength({ min:5})
],
async(req,resp)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }

    // for encrypting the password!
    const salt=await bcrypt.genSalt(19);
    let secPassword= await bcrypt.hash(req.body.password, salt);

    try{
        await user.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        })
        resp.json({success:true});
    } catch(error){
        console.log(error);
        resp.json({success:false});
    }
})

router.post("/loginuser",
[
body('email','Incorrect Email ID Format').isEmail(),
body('password','Incorrect Password Format').isLength({ min:5})
],
async(req,resp)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }

    let email=req.body.email
    try{
        let userData=await user.findOne({email})
        if(!userData){
            return resp.status(400).json({ errors: "Log in with Correct Credentials!" });
        }

        // bcrypt.compare --> compares the original pwd with userData.pwd
        let pwdCompare=await bcrypt.compare(req.body.password, userData.password);

        if(!pwdCompare){
            return resp.status(400).json({ errors: "Log in with Correct Credentials!" });
        }
        
        const data={
            user:{
                id:userData.id
            }
        }
        const authToken=jwt.sign(data, jwtSecret);
        return resp.json({success:true, authToken:authToken});
        
    } catch(error){
        console.log(error);
        resp.json({success:false});
    }
})

module.exports = router;
