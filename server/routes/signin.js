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

 
//console.log(req.body.user)	

try{
 const user = await User.findOne({unique_username:req.body.user.username+'-'+req.body.user[0][0]}).lean()

 //const token = await req.headers.Authorization;

 //const verify = jwt.verify(token, process.env.JWT);

 if (!user){ 
 
	if(req.body.user.pass !== '' || undefined){
	 const salt = await bcrypt.genSalt(10);
	 const encryppassword = await bcrypt.hash(req.body.user.pass,salt);
	 
	    const user = await new User ({
        username: req.body.user.username,
        password: encryppassword,
        unique_username:req.body.user.username + '-' +req.body.user[0][0],
		meeting_id:req.body.user[0][0],
		meeting_title:req.body.user[0][1],
		meeting_template:req.body.user[0][2],
        meeting_url:req.body.user[0][3],
		time_created:req.body.user[0][4],
		meeting_creator:req.body.user[0][5],
		meeting_duration:req.body.user[0][6],
		time_duration:req.body.user[0][7],
		time_gap:req.body.user[0][8],
		
      });
	  
       await user.save()
	   .then(async()=> {
		  //For new users
       const existing_user = await User.findOne({unique_username:req.body.user.username+'-'+req.body.user[0][0]}).lean();
	   res.status(200).send({id:existing_user._id,userName:existing_user.username,unique_username:existing_user.unique_username, time_gap:existing_user.time_gap,
	   user_meeting_template_doc:existing_user.meeting_template,msg:'Account created succesfully'})
		   })
	  .catch((error) => {
          res.status(400).send('Error!');
        });
	}
	
		const user = await new User ({
        username: req.body.user.username,
        password: '#NO**P@$$WORD&',
        unique_username:req.body.user.username + '-' +req.body.user[0][0],
		meeting_id:req.body.user[0][0],
		meeting_title:req.body.user[0][1],
		meeting_template:req.body.user[0][2],
        meeting_url:req.body.user[0][3],
		time_created:req.body.user[0][4],
		meeting_creator:req.body.user[0][5],
		meeting_duration:req.body.user[0][6],
		time_duration:req.body.user[0][7],
		time_gap:req.body.user[0][8],
		
      });
	  
       await user.save()
	   .then(async()=> {
       const existing_user = await User.findOne({unique_username:req.body.user.username+'-'+req.body.user[0][0]}).lean();
	   res.status(200).send({id:existing_user._id,userName:existing_user.username,unique_username:existing_user.unique_username,time_gap:existing_user.time_gap,user_meeting_template_doc:existing_user.meeting_template,msg:'Account created succesfully'})
		   })
	  .catch((error) => {
          res.status(400).send('Error!');
        });
		
	
 }
 else{
//const already_existing_user = await User.findOne({unique_username:req.body.user.username+'-'+req.body.user[0][0]}).lean();

 if(req.body.user.pass!== '' || undefined){
	 
	const already_existing_user = await User.findOne({unique_username:req.body.user.username+'-'+req.body.user[0][0]}).lean();
	
	const validPass = await bcrypt.compare(req.body.user.pass, already_existing_user.password)
	
    if(validPass){
	 res.status(200).send({id:already_existing_user._id,userName:already_existing_user.username,unique_username:already_existing_user.unique_username,
	 time_gap:already_existing_user.time_gap,user_meeting_template_doc:already_existing_user.meeting_template,msg:'Loged in succesfully'})	
	}	
	else{
		res.status(400).send('Error! Please use the correct login credentials');
	}
 }
 else{
	 
	const already_existing_user_with_no_pass = await User.findOne({unique_username:req.body.user.username+'-'+req.body.user[0][0]}).lean(); 
	
	if(already_existing_user_with_no_pass.password === '#NO**P@$$WORD&' ){
	return  res.status(200).send({id:already_existing_user_with_no_pass._id,userName:already_existing_user_with_no_pass.username,
	unique_username:already_existing_user_with_no_pass.unique_username,time_gap:already_existing_user_with_no_pass.time_gap,
	 user_meeting_template_doc:already_existing_user_with_no_pass.meeting_template,msg:'Loged in succesfully'})	
	}	
	else{
		res.status(400).send('Error! Please use the correct login credentials');
	}
 }
   
 };

 res.end()
}
catch(err){}

});



module.exports = router

