const express = require('express');
const router = require('./router/employeesRouter');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

mongoose.connect("mongodb://localhost:27017/HRMS",{// HRMS is our db name
    useNewUrlParser:true
}).then(()=>console.log('connection established'))
.catch(err=>{console.error(err);process.exit()});
app.use(bodyParser.json());
app.use(cors());
router(app);
//to read body content which received as string and intern convertds to json(marshalling and unmarshalling happens)
app.listen(3500,()=>console.log('Express server started'));//the user has to bind to particular port number

