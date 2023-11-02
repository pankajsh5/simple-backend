const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

app.use(cors());
app.use(express.json());


const MONGODB_URI = process.env.MONGODB_URI;

app.get('/test',(req,res)=>{
    return res.json("ok");
})
app.use('/auth',require('./route/Auth'));
app.use('/contact',require('./route/Contact'));

mongoose.connect(MONGODB_URI).then(()=>{
    console.log('connected to db');
    app.listen(5000,()=>{
        console.log('sever running at port : 5000');
    })
})
