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

/*
const client = mongoose.connect(url,connectionParams).then(() => {
      console.log("Successfully connected to What Time DB!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    })
	
*/

router.post('/',async(req,res,next)=>{

	try{
	
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
		time_duration:req.body.user[0][7]
		
      });
	  
       await user.save()
	  .then(()=> { res.status(200).send()})
	  .catch((error) => {
          res.status(500).send();
        });
	}
	else{
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
		time_duration:req.body.user[0][7]
		
      });
	  
       await user.save()
	  .then(()=> { res.status(200).send()})
	  .catch((error) => {
          res.status(500).send();
        });
		
	}
		
	  
	}
	catch(err){
		console.log(err)
	}
	

})

module.exports = router


