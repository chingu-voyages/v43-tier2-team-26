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
const Event = require("../events/eventsModelSchema");
const moment = require('moment'); // require
moment().format(); 






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


function getDayDiff(startDate, endDate) {
  const msInDay = 24 * 60 * 60 * 1000;

  return Math.round(
    Math.abs(endDate - startDate) / msInDay
  );
}



 let meetingSheduleTemplate = []



//Build all the dates and times of the meetingSheduleTemplate


function BuildAllDatesTimes(timesTemplatesArr,DatesArr){
meetingSheduleTemplate = []
DatesArr.map((dates)=>{

//console.log(dates)	
meetingSheduleTemplate.push({'date' : dates,'sheduled_time':[...timesTemplatesArr]})	


	
})

console.log(meetingSheduleTemplate)	


fs.writeFileSync("MeetingSheduleNew.txt", JSON.stringify(meetingSheduleTemplate, null, 1), (err) => {

       if (err) console.log(err)

});

}

//Create Split Hours eg 10:15,10:30 etc

function CreateTimeSplits(hourArr,selectedDatesArr){
//console.log(selectedDatesArr)
let hour_arr_copy = [...hourArr]
let finalTimeComp = []

let countTime = 0
hourArr.map(()=>{

countTime++;

let theHour  = hour_arr_copy.shift()	

let theHour_copy = Number(theHour.split(':')[0])

let counter_time = 0

let time_split = 0

let allTimesArry = []


let allocateAMPM = Number(theHour.split(':')[0]) < 10 ? theHour.slice(4) : theHour.slice(5)

let composeTimeString = {'time_picked':theHour,'members_choosed_time':[]}

allTimesArry.push(composeTimeString)

//console.log({time_picked:theHour,members_choosed_time:[]})
while(counter_time < 3){
	

//console.log(time_split += 15)	
time_split += 15
//console.log({time_picked:theHour_copy + ':' + time_split,members_choosed_time:[]} )
let composeTimeStringSplit = {'time_picked':theHour_copy + ':' + time_split + allocateAMPM,'members_choosed_time':[]}
allTimesArry.push(composeTimeStringSplit)
counter_time++	
}

//console.log({'time_sheduled' : theHour, 'members_time_picks':[...allTimesArry]})

const isLastMeetingTime = countTime === hourArr.length ? true : false

const isLastMeetingTimeHour = countTime === hourArr.length ? Number(theHour.split(':')[0]) + 1 + ":" + theHour.split(':')[1] : ''

//console.log(isLastMeetingTimeHour)


finalTimeComp.push({'time_sheduled' : theHour,
'last_meeting_shedule' : isLastMeetingTime,
'last_meeting_shedule_time' : isLastMeetingTimeHour,
 'members_time_picks':[...allTimesArry]})




	
	
})
//console.log(finalTimeComp)	
//////////console.log(hourArr)

BuildAllDatesTimes(finalTimeComp,selectedDatesArr)
}

//Create Hours

function CreateTimeObjects(time_space,timeStart,endTime,selectedDatesArr){


const beforeNoonORafterNoon = timeStart.slice(6)



let beforeNoonORafterNoonCopy = beforeNoonORafterNoon

let timeMakerStartTime = Number(timeStart.split(':')[0])

let timeMakerStartTimeCopy = timeMakerStartTime

let counter = 0

let hour_arr = []

let timeF = []

while(counter < time_space){


if(timeMakerStartTimeCopy > 12){
timeMakerStartTimeCopy = 1	

if(beforeNoonORafterNoonCopy === 'AM'){
beforeNoonORafterNoonCopy = 'PM'	
	
}
else if(beforeNoonORafterNoonCopy === 'PM'){
beforeNoonORafterNoonCopy = 'AM'	
	
}
else{
	return beforeNoonORafterNoonCopy
}
}
//console.log(beforeNoonORafterNoonCopy)
hour_arr.push(timeMakerStartTimeCopy + ':00' +  beforeNoonORafterNoonCopy )
timeMakerStartTimeCopy++


counter++	



}
//console.log(timeF)

//console.log(hour_arr)

CreateTimeSplits(hour_arr,selectedDatesArr)
	
}






router.post('/',async(req,res,next)=>{
	
	
	let meeting_start_time = await req.body.event.time_from
	
	let meeting_end_time = await req.body.event.time_to
	
	var startTime = await moment(meeting_start_time, 'hh:mm:ss a');
    var endTime = await moment(meeting_end_time, 'hh:mm:ss a');

    var time_space_diff = await endTime.diff(startTime, 'hours');


	
//const days_diff = await getDayDiff(new Date(req.body.event.date_from), new Date(req.body.event.date_to))

const dateFromdateTo = req.body.event.meeting_dates

const eventId = await Date.now().toString().slice(11)

const eventId2 = await Date.now().toString()

const randomNum_1 = await Math.floor(Math.random() * 4)


const code = await Math.random().toString(36).substring(2,7)

const createDocumentId = `${code}${eventId}${req.body.event.meeting_title.charAt(0)}${req.body.event.meeting_title.charAt(req.body.event.meeting_title.length-1)}`

//console.log(dateFromdateTo)

await CreateTimeObjects(Number(time_space_diff),req.body.event.time_from,req.body.event.time_to,dateFromdateTo)



try{


const newEvent = new Event ({
_id : createDocumentId,
meeting_title:req.body.event.meeting_title,
meeting_url: req.protocol + '://' + req.get('host') + '/' + 'w' + '/' + 'viewevent' + '/' +  createDocumentId,
time_from:req.body.event.time_from,
time_to:req.body.event.time_to,
time: req.body.event.time_from + ' to ' + req.body.event.time_to,
date_from:dateFromdateTo[0],
date_to:dateFromdateTo[dateFromdateTo.length - 1],
time_zone:req.body.event.time_zone,
date_duration:req.body.event.date_from + ' to ' + req.body.event.date_to ,
time_gap:Number(time_space_diff),
//days_gap:Number(days_diff),
meeting_data:meetingSheduleTemplate,
usser_meeting_data:meetingSheduleTemplate,
team_members_user_names:[],

active:true	
})


await newEvent.save()

.then(()=> { res.redirect(`http://localhost:5000/w/viewevent/${createDocumentId}`)})
.catch((error) => {
res.status(500).send();
console.log(error)
})

}
catch(err){
console.log(err)
}

});



module.exports = router

