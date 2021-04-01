//mongodb+srv://albertbyrone:<password>@cluster0.yjdb8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const productRouter = require('./routes/product')
const app = express();



mongoose.connect('mongodb+srv://albertbyrone:Albert254@cluster0.yjdb8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(()=>{
        console.log("Connected to the database");
    }).catch(error =>{
        console.log(error);
    });

app.use((req,res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content,Accept,Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT,PATCH,DELETE,OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use('/api/products', productRouter);


module.exports = app;