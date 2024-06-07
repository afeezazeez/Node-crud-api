const express = require('express');

const app = express();

app.get('/', (req,res)=>{
    res.send("Node app is working!");
});

app.get('/blog', (req,res)=>{
    res.send("Hello blog!");
});

module.exports = app;