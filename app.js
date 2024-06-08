const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

const  postRoute = require('./routes/posts');
const  userRoute = require('./routes/user');
const errorHandler = require('./middleware/errorHandler')


app.use(bodyParser.json());

app.use("/posts",postRoute);
app.use("/user",userRoute);

app.use(errorHandler);

module.exports = app;