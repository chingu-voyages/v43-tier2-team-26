const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser");
const path = require("path");
const fs = require('fs')
const app = express()
const router = express.Router()
const {MongoClient} = require("mongodb");
const mongoose = require('mongoose')
const url = process.env.MONGO_URL;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/usersSchema");





const JWT_SECRET =process.env.JWT;

app.use(express.urlencoded({ extended: true}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json())

var corsOptions = {
origin : "http://localhost:3000"
}

app.use(cors(corsOptions))



const connectionParams={
useNewUrlParser : true,
useUnifiedTopology: true
}







router.post('/',async(req,res,next)=>{
	

try{
 const user = await User.findOne({email:req.body.user.email}).lean()

 //const token = await req.headers.Authorization;

 //const verify = jwt.verify(token, process.env.JWT);

 console.log(user._id)

 if (!user){ 
 return res.status(400).send()
 }
 else{
 res.status(200).send({'userId' : user._id })	 
 };


 //const validPass = await bcrypt.compare(req.body.user.pass, user.password);

 /*
  if (!validPass){
  return res.status(400).send()}
  else{
 const token = await jwt.sign({ userId: user._id,userEmail: req.body.user.email}, process.env.JWT,{ expiresIn: "72h" });
  
 console.log(token)
  
 return res.header("what-time-auth-token", JSON.stringify(token), {httpOnly: true}).status(200).send(token);
  
  

  
  user.token = token

  }
  

   */
 res.end()
}
catch(err){}

});

///////////////

module.exports = router

