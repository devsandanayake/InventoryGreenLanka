const express = require('express');
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

router.post('/register',(req,res)=>{
    const today = new Date();

    const userData = {
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        created:today
    }

     // Check password length and complexity
   const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+[\]{}|;:'",.<>?\/\\\-=]+$/;
   if (userData.password.length < 10 || !passwordRegex.test(userData.password)) {
    return res.status(400).json({ error: 'Password must be at least 10 characters long and contain letters, numbers, and special characters.' });
  }
    
    User.findOne({
        email:req.body.email
        .then(user=>{
            if(!user){
                bcrypt.hash(req.body.password,10,(err,hash)=>{
                    userData.password = hash
                    User.create(userData)
                    .then(user=>{
                        res.status(200).json({status:user.email+'registered'});
                    })
                    .catch(err=>{
                        res.status(500).json({error:"Failed to register user"})
                    });
                });
            } else {
                re.status(400).json({error:"User already exists"})
            }
        })
        .catch(err=>{
            res.status(500).json({error:"Failed to register user"})
        })
     
    })

})

router.post('/login',(req,res)=>{
    User.findOne({
        username:req.body.username
    })
    .then(user=>{
        if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){
                const userToken = {
                    _id:user._id,
                    username:user.username,
                    email:user.email
            };
            let token = jwt.sign(userToken,process.env.SECRET_KEY,{expiresIn:1440});
            res.send(token);
        }else{
             res.status(401).json({error:"Invalid password"});
        }
    }else{
        res.status(404).json({error:"user not found"});
    }

    
    })
    .catch(err=>{
        res.status(500).json({error:"Failed to login"});
    })
})

module.exports = router;