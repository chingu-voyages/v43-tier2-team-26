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
const Events = require("../events/eventsModelSchema");
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



router.post('/',async(req,res,next)=>{
const {event_title,event_Id,my_meeting_shedule_id,team_member} = req.body	

try{
	
const ifUsserIsCreatorOfDoc = await Events.findOne({_id:event_Id, 'team_members.team_member':team_member}
	,{'team_members.$' : 1})

if(ifUsserIsCreatorOfDoc){

const findUserMeeting = await Events.findByIdAndUpdate({_id:event_Id},
  { $pull: { team_members:{'_id' : my_meeting_shedule_id} } }, { new: true })
  
  
  return res.status(200).send(findUserMeeting)
  
}
else{
res.status(500).send({'message':' Could not delete message'})			
}

}
catch(err){}

});


module.exports = router

