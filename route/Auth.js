const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');

router.post('/login',async(req,res)=>{
    const { email,password } = req.body;

    if( !email || !password )
        return res.status(400).json({
            message : "email and password are required"
        })

    try {
        const currUser = await User.findOne({
            email
        });
        
        if( !currUser )
            return res.status(400).json({
                message : "user doesn't exist"
            });
    
        const match = await bcrypt.compare(password,currUser?.password);
    
        if( !match )
            return res.status(400).json({
                message : "passwrod didn't match"
            })
    
        return res.json({
            message : "user logged in"
        })
    
    } catch (error) {
        return res.json({
            message : "some error occured",
            error,
        })
    }
});

router.post('/register',async(req,res)=>{
    const { email,password,username } = req.body;

    if( !email || !password || !username )
        return res.status(400).json({
            message : "email, username and password are required"
        })

    try {
        const exists = await User.findOne({ email });
        // console.log(exists);
    
        if( exists )
            return res.status(400).json({
                message : 'user already exists'
            });
    
        const hashedPassword = await bcrypt.hash(password,10);
    
        const newUser = await User.create({
            email,
            username,
            password : hashedPassword
        });
    
        console.log(newUser);
    
        return res.status(201).json({
            message : "user created"
        });
    } catch (error) {
        return res.status(500).json({
            message : "user not created",
            error,
        })
    }
})

module.exports = router;