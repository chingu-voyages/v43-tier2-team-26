const express = require("express")
require('dotenv').config()
const PORT = process.env.PORT || 5000
const app = express()
const path = require("path");
const router = express.Router()
const bodyParser = require("body-parser")
const MongoClient = require("mongodb").MongoClient;
const mongoose = require('mongoose')
const url = process.env.MONGO_URL;
const signUp = require('./routes/signup.js')
const signIn = require('./routes/signin.js')
const createEvent = require('./events/createEvents.js')
const viewEvents = require('./events/viewEvents.js')
const MeetingEvents = require("./events/eventsModelSchema");
const delEvents = require("./events/deleteEvents.js");
const joinMeeting = require("./events/joinMeeting.js");
const cancelMeeting = require("./events/cancelMeeting.js");
const updateAEvent = require("./events/updateAnEvent.js");
const updateAUsserMeetingEvent = require("./events/updateAUsserEvent.js");




const fs = require("fs");

const cors = require("cors")

app.use(express.static(path.join(__dirname,'..','client/build')));

var corsOptions = {
origin : "http://localhost:3000"
}

app.use(cors(corsOptions))


const connectionParams={
useNewUrlParser : true,
useUnifiedTopology: true
}


const client = mongoose.connect(url,connectionParams).then(() => {
      console.log("Successfully connected to What Time DB!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    })
	



app.use(express.urlencoded({ extended: true}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json())

app.use(router)


app.use("/w/signup",signUp)

app.use("/w/signin",signIn)

app.use("/w/createevent",createEvent)

app.use("/w/deleteevent",delEvents)

app.use("/w/joinmeeting",joinMeeting)

app.use("/w/cancelmeeting",cancelMeeting)

app.use("/w/updateanevent",updateAEvent)

app.use("/w/update",updateAUsserMeetingEvent)





app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


// VIEW EVENTS

router.get('/w/viewevent/:id',async(req,res,next)=>{

try{
const getEvent = await MeetingEvents.findById(req.params.id).lean()


if(getEvent){
res.status(200).json(getEvent)
}
else{
res.status(400).send({'message':'Error!'})	
}
}
catch(err){}
});


 
 
 
app.get("/w/signin", (req,res)=>{
	
res.redirect('/')
})

app.get("/w/signup", (req,res)=>{
	
res.redirect('/')
})


app.get("/", (req,res)=>{	
res.sendFile(path.resolve(__dirname,'..','clientSide/build/index.html'))

})



app.get("*", (req,res)=>{
	
res.status(404).send(`<h1>404 error! SORRY! THE PAGE DOES NOT EXIST</h1>
</br>

`)
})


app.listen(PORT,(err)=>{
!err ? console.log(`Connected to ${PORT}`) : console.log(err)

}
)









