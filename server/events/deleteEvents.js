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


router.post('/',async(req,res,next)=>{

try{
 const eventId = await req.body.evtId
 

 const delEvent = await Events.deleteOne({_id:eventId})

 if(delEvent){
 res.status(200).send({'message':'Event has been deleted'})
 }
 else{
 res.status(500).send({'message':'Error!'})	
 }

}
catch(err){console.log(err)}



});



module.exports = router

