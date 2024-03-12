//Basic Lib Import
const express=require('express');
const router=require('./src/routes/api');
const app=new express();
const bodyParser=require('body-parser');


//security middleware lib import
const rateLimit=require('express-rate-limit');
const helmet=require('helmet');
const mongoSanitize=require('express-mongo-sanitize');
const xss=require('xss-clean');
const hpp=require('hpp');
const cors=require('cors');



//Database lib Import
const mongoose=require('mongoose');


//security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

//Body Parser Implement
app.use(bodyParser.json());

//Request Rate Limit
const limiter=rateLimit({windowsMs:15*60*1000,max:3000})
app.use(limiter);

mongoose.connect('mongodb://127.0.0.1:27017/ToDo',{autoIndex:true}).then(()=>{
    console.log("database connected")})
    .catch(()=>{
        console.log("database connection fail")
    })
//routing Implement
app.use("/api/v1",router);

//undefined Route Implement
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not found"})

})

module.exports=app;