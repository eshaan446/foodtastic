const express=require('express');
const User=require('../models/User')
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
const jwtSecret="MynameisEshaanPandeyandIamDeveloper";

router.post("/createuser",[ 
body('email').isEmail(),
body('name').isLength({ min: 5 }),
body('password',"Incorrect Password").isLength({ min: 5 })]
,async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt=await bcrypt.genSalt(10); //generatimg salt (google this)
    let secPassword=await bcrypt.hash(req.body.password,salt) //secured password
    try{
        await User.create({
            name:req.body.name,
            password:secPassword,
            email:req.body.email,
            location:req.body.location
        }).then(res.json({success:true}));
    }catch(err){
        console.log(err);
        res.json({success:false});
    }
})

router.post('/loginuser', [
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Password cannot be blank").exists(),
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });  //{email:email} === {email}
        if (!user) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }

        const pwdCompare = await bcrypt.compare(password, user.password); // this return true false.
        if (!pwdCompare) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        success = true;
        const authToken = jwt.sign(data, jwtSecret);
        res.json({ success, authToken })


    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }
})
module.exports=router