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
	
try{
	

	
const new_meeting_member_info =  {event_title,event_Id,name,time,day,time_zone,location,team_member} = req.body

const userHasJoined = await Events.findOne({_id:new_meeting_member_info.event_Id},{'team_members.team_member': 1})

const usserHasJoined_id = await userHasJoined.team_members.find((i)=> { return i.team_member === team_member })



if(!usserHasJoined_id ){

const theEventId= await Events.updateOne({_id:new_meeting_member_info.event_Id},
{$push:{team_members:new_meeting_member_info}}).lean()

const eventInfo = await Events.findOne({_id:new_meeting_member_info.event_Id}).lean()
console.log(eventInfo)

if(theEventId && theEventId ){
return res.status(200).send(eventInfo)


}
else{
res.status(500).send({'message':'Error! '})	
}

}
else{
res.status(500).send({'message':' You have already joined this meeting schedule'})		
}

}
catch(err){}

});


module.exports = router

