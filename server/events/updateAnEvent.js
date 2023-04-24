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

const meeting_event_id = await req.body.meetingId;
const meeting_event_shedule_data = await req.body.meetingDataShedule;


try{
await Events.updateOne({_id: meeting_event_id},{meeting_data:meeting_event_shedule_data})

}
catch(err){console.log(err)}



});



module.exports = router

