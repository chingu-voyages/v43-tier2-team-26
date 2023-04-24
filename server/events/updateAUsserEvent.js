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


router.put('/',async(req,res,next)=>{

//console.log(req.body)
const unique_user_name = await req.body.unique_user_name;
const meeting_event_shedule_data = await req.body.meetingDataShedule;

console.log(meeting_event_shedule_data)




try{
await User.updateOne({unique_username:unique_user_name },{meeting_template:meeting_event_shedule_data})

}
catch(err){console.log(err)}



});



module.exports = router

