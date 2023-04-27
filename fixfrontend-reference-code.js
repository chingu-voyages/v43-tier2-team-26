import {React,useEffect,useState,useRef} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
 import { flushSync } from 'react-dom';
import logo from './logo.svg';
import './App.css';
import Layout from "./pages/layout";
import Home from "./pages/index";
import Blogs from "./pages/blogs";
import Contact from "./pages/contact";
import SingIn from "./pages/signin";
import SignUp from "./pages/signup";
import Error404  from "./pages/error404";

function App() {




//View Meeting
const viewMyMeeting = async(e)=>{
//e.preventDefault()	

fetch("/w/viewevent/9hs1c70CG",{
	
method: 'GET',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },


}) .then((response) => response.json())
   .then((data) => {
     // console.log(data);
      setMeeting_shedule_data([data]);
      /*
	  setSignUpInfo([data].map((info)=>{ return [info._id,info.meeting_title,info.usser_meeting_data,
	  info.meeting_url,info.created_on,info.meeting_event_creator,info.date_duration,info.time,info.time_gap]}));
	  */
	  setSignInInfo([data].map((info)=>{ return [info._id,info.meeting_title,info.usser_meeting_data,
	  info.meeting_url,info.created_on,info.meeting_event_creator,info.date_duration,info.time,info.time_gap]}))
   })
   .catch((err) => {
      console.log(err.message);
   });

}



useEffect(()=>{
	
viewMyMeeting()
	
},[])

//MEETING STATE	
const [meeting_shedule_data, setMeeting_shedule_data] = useState([])

//USER TEMPLATE STATE
const [user_meeting_shedule_data_template, setUser_meeting_shedule_data_template] = useState([])


//console.log(user_meeting_shedule_data_template)	

	
	/////////////// SIGN UP ////////////// DONT USE!!!!!
	const [data, setData] = useState([]);
	 const [data1, setData1] = useState();
	 const [signUpMessage, setSignUpMessage] = useState('');
	 
	 const [signUpInfo, setSignUpInfo] = useState({});

	 const signupButton = useRef(null)
	 
	
const handleSubmit = async(e)=>{
e.preventDefault()	

fetch("/w/signup",{
	
method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        user: signUpInfo
    })


}).then((signUpStatus)=>{console.log(signUpStatus);signUpStatus.status === 200 ? setSignUpMessage('Your Account has been sucessfully created') : setSignUpMessage('Could not complete user signup') })


}

const buttonAnimationSignUp = ()=>{
	
signupButton.current.style.marginRight = '5%';
signupButton.current.style.transition = '00.2s'

const endAnim = setTimeout(()=>	{
signupButton.current.style.marginRight = '0%';
signupButton.current.style.transition = '00.2s'
},300)

return ()=> clearTimeout(endAnim)
	
}

const signUpEmail = (e)=>{	
setSignUpInfo((info)=>({
	
...info,
username: 	e.target.value
	
}))		
}

const signUpPass = (e)=>{	
setSignUpInfo((info)=>({
...info,
pass: 	e.target.value
	
}))	
 	
	
}


/////////////// SIGN IN

	/// const [dataSignIn, setDataSignIn] = useState([]);
	// const [data1SignIn, setData1SignIn] = useState();
	 const [signInMessage, setSignInMessage] = useState('');
	 
	
	 
	 const loginButton = useRef(null)


const authToken = localStorage.getItem('Authorization-what-time-app')

//console.log(authToken)

const [signInInfo, setSignInInfo] = useState({});
console.log(signInInfo)

const handleSubmitSignIn = (e)=>{
e.preventDefault()	
fetch("/w/signin",{
	
method: 'POST',
    headers: {
        'Content-Type': 'application/json',
		"Access-Control-Allow-Origin": "*",
		'Authorization' : `Bearer ${authToken}`,
        'Accept' : 'application/json',
		'withCredentials': true
		
    },
    body: JSON.stringify({
        user: signInInfo
    })

}).then((response) => response.json())
   .then((data) => {
      console.log(data);
	 setUserAcctInfo(data);
	setUser_meeting_shedule_data_template([data])
      
   })
   .catch((err) => {
      console.log(err);
   });

}





const buttonAnimationSignIn = ()=>{
	
loginButton.current.style.marginRight = '5%';
loginButton.current.style.transition = '00.2s'

const endAnim = setTimeout(()=>	{
loginButton.current.style.marginRight = '0%';
loginButton.current.style.transition = '00.2s'
},300)

return ()=> clearTimeout(endAnim)
}

const signInEmail = (e)=>{	
setSignInInfo((info)=>({
	
...info,
username: 	e.target.value
	
}))	
}

const signInPass = (e)=>{	
setSignInInfo((info)=>({
...info,
pass: 	e.target.value
	
}))		
}

const timeZone = (e)=>{	
setSignInInfo((info)=>({
...info,
time_zone: 	e.target.value
	
}))		
}






//CREATE event


const [createEvents, setCreateEvents] = useState({

meeting_title:'CREATE A SOLUTION TO COMBAT GLOBAL WARMING',
time_from:'10:00 AM',
time_to:'5:00 PM',
date_from:'2023/04/15',
date_to:'2023/04/20',
meeting_dates:['wed 19 Apr 2023','thur 20 Apr 2023','fri 21 Apr 2023','sat 22 Apr 2023','sun 23 Apr 2023'],
time_zone:'Eroupe/Sweeden (GMT+2)',
event_creator : 'Stellaix' //THIS SHUD BE THE USERNAME OF THE EVENT CREATOR
});


const createEvent = (e)=>{
e.preventDefault()	

fetch("/w/createevent",{
	
method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        event: createEvents
    })


}).then((signUpStatus)=>{signUpStatus.status === 200 ? setSignUpMessage('Your Event has been sucessfully created') : setSignUpMessage('Could not create your event') })


}


const eventTitle = (e)=>{	
setCreateEvents((info)=>({
	
...info,
[e.target.name]: 	e.target.value
	
}))	

console.log(createEvents)
}

const eventDuration = (e)=>{	
setCreateEvents((info)=>({
...info,
[e.target.name]: 	e.target.value
	
}))	
console.log(createEvents)	
}

////////////// DELETE EVENTS
const [delEvents, setDelEvents] = useState("m6dq098FS");

const deleteEvent = (e)=>{
e.preventDefault()	

fetch("/w/deleteevent/",{
	
method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
	body:JSON.stringify({evtId:delEvents})
    


}).then((signUpStatus)=>{signUpStatus.status === 200 ? setSignUpMessage('Your Event has been sucessfully created') : setSignUpMessage('Could not create your event') })


}



/// JOIN MEETING DONT USE

const [joinAmeeting,setJoinAmeeting] = useState({
'event_title' : 'Coding wat time App',
'event_Id' : 'ct3lt46Dy',
'name' : ' Bill Gates',
'time' : '5pm',
'event_day' : '1-4-2023',
'time_zone' : 'GMT+1',
'location' : 'OSAKA',
'team_member' : '64331624aec75ac9d1a121ae',
})


const joinMeeting = async(e)=>{
e.preventDefault()	

fetch("/w/joinmeeting",{
	
method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
	body: JSON.stringify(joinAmeeting)
  


}) .then((response) => response.json())
   .then((data) => {
      console.log(data);
      // Handle data
   })
   .catch((err) => {
      console.log(err.message);
   });

}



/////////////////// CANCEL MY AppointMent DONT USE

const [cancelAmeeting,setcancelAmeeting] = useState({
'event_title' : 'Coding wat time App',
'event_Id' : 'ct3lt46Dy',
'my_meeting_shedule_id' : '643316c3aec75ac9d1a121b1', //This the id of the current doc
'team_member' : '64331624aec75ac9d1a121ae',
})


const cancelMeeting = async(e)=>{
e.preventDefault()	

fetch("/w/cancelmeeting",{
	
method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
	body: JSON.stringify(cancelAmeeting)
  


}) .then((response) => response.json())
   .then((data) => {
      console.log(data);
      
   })
   .catch((err) => {
      console.log(err.message);
   });

}





//For inserting date and time values

const  [date_time,setDate_time] = useState([])

const  [can_pick,setCan_pick] = useState(true)





///// UPDATE DATA IN THE DATA BASE && State WHEN A USER SELECTS time, ie clicks on the small boxes


const updateAnEvent = async(meetingEventId,theMeetingData)=>{
//e.preventDefault()	


const meetingData = await {
	'meetingId' : meeting_shedule_data[0]._id ,
	'meetingDataShedule' :meeting_shedule_data[0].meeting_data
	
}
console.log(meetingData)
fetch("/w/updateanevent",{
	
method: 'PUT',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
	body: JSON.stringify(meetingData)
  


}) .then((response) => response.json())
   .then((data) => {
      console.log(data);
      // Handle data
   })
   .catch((err) => {
      console.log(err);
   });

}








const date = useRef(null)
const time = useRef(null)
const [userAcctInfo,setUserAcctInfo] = useState([])

//console.log(userAcctInfo)


async function Insert_Chosen_Date_Time(){
	

setCan_pick(false)

const userName = userAcctInfo.userName

const id = userAcctInfo.id

const selectedDate = await date.current

const selectedTime = await time.current

const selectedHourTemp = await selectedTime.split(':')[0]

const selectedAMorPM = await selectedTime.split(':')[1]

const selectedHour = await selectedHourTemp + ':00' + selectedAMorPM.slice(2)




if(userName){

await setUser_meeting_shedule_data_template((meeting_shedule_datax)=>	
meeting_shedule_datax.map((m_data)=>{
return{...m_data,user_meeting_template_doc:[...m_data.user_meeting_template_doc
.map((data)=>{

if(data.date === selectedDate){
	
const meetingSheduleData = data
	
return {...data, sheduled_time:[...data.sheduled_time

.map((meetingHour)=>{
	
if(	meetingHour.time_sheduled === selectedHour){
return 	{...meetingHour,members_time_picks:[...meetingHour.members_time_picks
.map((memberSelectedTime)=>{
if(memberSelectedTime.time_picked === selectedTime  ){
	const checkIfUserHasPicked = memberSelectedTime.members_choosed_time.indexOf(userName)	
	if(checkIfUserHasPicked === -1){
    return 	{...memberSelectedTime, members_choosed_time:[...memberSelectedTime.members_choosed_time,  userName ] }
	}
	else{
	return 	{...memberSelectedTime, members_choosed_time:[...memberSelectedTime.members_choosed_time.filter((names)=>{return names !== userName}) ] }	
	}
}
return memberSelectedTime
})
]}
}
return 	meetingHour	
})

]}
}

return data	
})	
]}
})
)




	
await setMeeting_shedule_data((meeting_shedule_datax)=>	
meeting_shedule_datax.map((m_data)=>{
return{...m_data,meeting_data:[...m_data.meeting_data
.map((data)=>{

if(data.date === selectedDate){
	
const meetingSheduleData = data
	
return {...data, sheduled_time:[...data.sheduled_time

.map((meetingHour)=>{
	
if(	meetingHour.time_sheduled === selectedHour){
return 	{...meetingHour,members_time_picks:[...meetingHour.members_time_picks
.map((memberSelectedTime)=>{
if(memberSelectedTime.time_picked === selectedTime  ){
	const checkIfUserHasPicked = memberSelectedTime.members_choosed_time.indexOf(userName)	
	if(checkIfUserHasPicked === -1){
    return 	{...memberSelectedTime, members_choosed_time:[...memberSelectedTime.members_choosed_time,  userName ] }
	}
	else{
	return 	{...memberSelectedTime, members_choosed_time:[...memberSelectedTime.members_choosed_time.filter((names)=>{return names !== userName}) ] }	
	}
}
return memberSelectedTime
})
]}
}
return 	meetingHour	
})

]}
}

return data	
})	
]}
})
)
}
setCan_pick(true)
//console.log(user_meeting_shedule_data_template)
}





////UPDATE USER DATA BASE WHEN THEY CLICK THE BOXES



const updateWhenUserCLicksTime = async(meetingEventId,theMeetingData)=>{
//e.preventDefault()	

//console.log(meetingEventId,theMeetingData)
const the_user_Data = await {
	'username':userAcctInfo.userName,
	'unique_user_name':userAcctInfo.unique_username,
	'meetingId' : meetingEventId ,
	'meetingDataShedule' :theMeetingData
	
}


fetch("/w/update",{
	
method: 'PUT',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
	body: JSON.stringify(the_user_Data)
  


}) .then((response) => response.json())
   .then((data) => {
      console.log(data);
      // Handle data
   })
   .catch((err) => {
      console.log(err);
   });

}



////ADDING USER TIMES PICKED

async function addDate(chosenDate,meetingEventId,theMeetingData){
date.current = chosenDate

if(can_pick === true){	
await Insert_Chosen_Date_Time()	
await updateAnEvent()
await updateWhenUserCLicksTime(meetingEventId,theMeetingData)
}
else{
return false
}
}

async function addTime(chosenTime){
time.current = chosenTime

}

const timePicksFirst = useRef([])

const timePicksOthers = useRef([])


//Display date & time when hovered funcs

async function addDateHover(chosenDate){
date.current = chosenDate

whatTimeDate()
}

async function addTimeHover(chosenTime){
time.current = chosenTime

}

/// Show time on hover
const [watTimeDate,setWatTimeDate] = useState()

function whatTimeDate(){

setWatTimeDate(date.current + ' ' + time.current  )	
	
}

/// SHOW MEMBERS WITH SIMILAR time

const [memberWithSimilarTimes,setMemberWithSimilarTimes] = useState()

var sameTimePickers = ' '
function similarTimePicks(array){
var sameTimePickers = ' '
	
 array.map((members_with_same_time)=>{
	

return sameTimePickers  += members_with_same_time + ',' 
	
}
)
setMemberWithSimilarTimes(sameTimePickers)	
}






  return (
  
  
  
    <div className="App">
	
	
	
	
	{/*
     <div className="sign up">
	<h2 style={{color:'pink',textAlign:'center'}}>Sign Up</h2>
	
	<form  onSubmit={handleSubmit}  >
	<div style={{width:'30%', border:'1px solid pink', margin:'auto', borderRadius:'100px', borderStyle:'dashed'}}>
	<div style={{display:'flex', flexDirection:'column', width:'97%',margin:'0.3rem', border:'1px solid pink', borderRadius:'10rem', overflow:'hidden'}}>
	<div style={{display:'flex', justifyContent:'center'}}><input type='text' placeholder='username' name='username' style={{width:'70%',height:'3rem',border:'0px',outline:'none',color:'pink'}} onChange={(e)=>signUpEmail(e)} /></div>
	<div style={{width:'75%',height:'2.5rem',margin:'auto',border:'1px solid pink', borderRadius:'5rem'}}><button type='submit' style={{height:'100%', width:'30%',borderRadius:'5rem',border:'0px',float:'right',backgroundColor:'pink',color:'white'}} ref={signupButton} onClick={buttonAnimationSignUp} >Sign Up</button></div>
	<div style={{display:'flex', justifyContent:'center'}}><input type='Password' placeholder='Password' name='password' style={{width:'70%',height:'3rem',border:'0px',outline:'none',color:'pink'}} onChange={(e)=>signUpPass(e)} /></div>
	</div>
	</div>
	<p>{signUpMessage}</p>
	</form>
    </div>
	*/}
	
	<h2 style={{color:'pink',textAlign:'center'}}>Sign In</h2>
	
	<form  onSubmit={handleSubmitSignIn}  >
	<div style={{width:'30%', border:'1px solid pink', margin:'auto', borderRadius:'100px', borderStyle:'dashed'}}>
	<div style={{display:'flex', flexDirection:'column', width:'97%',margin:'0.3rem', border:'1px solid pink', borderRadius:'10rem', overflow:'hidden'}}>
	<div style={{border:'0px solid red',display:'flex', justifyContent:'center'}}><input type='text' placeholder='username' name='username' style={{width:'70%',height:'3rem',border:'0px',outline:'none',color:'pink'}} onChange={(e)=>signInEmail(e)}  /></div>
	<div style={{width:'75%',height:'2.5rem',margin:'auto',border:'1px solid pink', borderRadius:'5rem'}}><button type='submit' style={{height:'100%', width:'30%',borderRadius:'5rem',border:'0px',float:'right',backgroundColor:'pink',color:'white'}} ref={loginButton} onClick={buttonAnimationSignIn} >Login</button></div>
	<div style={{border:'0px solid red',display:'flex', justifyContent:'center'}}><input type='Password' placeholder='Password' name='password' style={{width:'70%',height:'3rem',border:'0px',outline:'none',color:'pink'}} onChange={(e)=>signInPass(e)} /></div>
	</div>
	</div>

	</form>
	
	
	<p style={{color:'pink',cursor:'pointer',textAlign:'center'}}> Forgot password?</p>
	
		<p>{signInMessage}</p>
		
		 <select  onChange={timeZone}>
      className="form-control"
      aria-label="Floating label select example"
     
      <option value="choose" disabled selected="selected">
         -- Select Time Zone --
      </option>
	  <option value="ASIA/kuwait"  >
         ASIA/kuwait
      </option>
	  <option value="Europe/Uk"  >
         Europe/Uk
      </option>
    
      </select>
		
		
	<h1>EVENTS</h1>
	<form onSubmit={createEvent} >
		{/*
	<div> <input type='text' name = 'meeting_title' placeholder='title' onChange={eventTitle}/> </div>
	<div> <input type='text'  name="duration" placeholder='duration' onChange={eventDuration}/> </div>
	*/}
	<div> <input type='submit' value='Create Event' /> </div>
		
	
	</form>
	    <br />
		<br />
		<br />
		<form>
		<button onClick={deleteEvent}>Delete Event</button> 
		</form>
		<br />
		<br />
		<br />
		
		<button onClick={joinMeeting}>Join Meeting</button>
		<br />
		<br />
		<br />
		<button onClick={cancelMeeting}>Cancel Meeting</button>
		<br />
		<br />
		<br />
		
		
		
		  ////////////NOTE : FIND THE function similarTimePicks(array) ON LINE 1305
///		  AND MAKE IT PERFECT. THE NAME ARE DISPLAYED IN LIKE THIS,
		  //// Adam,Eve,Kain,Abel
		  //// It shud be 
		  ////  //// Adam,
		           //Eve,
		           //Kain,
		         //  Abel
		
		<br />
		<br />
		<br />
		////BEGINING OF THE USER AVAILABILITY DISPALY 
		
		<div style={{ display:'flex', flexDirection:'row',width:'fit-content',border:'1px solid red',margin:'auto'}}>
	
     	{   meeting_shedule_data.map((data,indexMain)=>{
			return (
			data.meeting_data.map((info,indx)=>{
			return(
			
			<div key={indx + 'data4'}>
			
			<div style={{width:'5rem',margin:'2px',border:'1px solid blue'}}>
			<div> {info.date.split(' ')[2]} {info.date.split(' ')[1]}</div>
			<div> {info.date.split(' ')[0].toUpperCase().slice(0,1)}{info.date.split(' ')[0].slice(1)}</div>
			</div>
			<div style={{display:'flex', flexDirection:'column',margin:'2px',border:'0px solid green'}}  onMouseOver={()=>{addDateHover(info.date)}} >
			
			
			<div key = {indx + 'data5'}>
			{
				info.sheduled_time.map((info,index)=>{
				return(
				<div style={{display:'flex', flexDirection:'row'}} key={index+"data7"}> 
			
			{
				indx === 0 ?                                                                                        ////borderBottom: index !== 6 ? '0px' | The 6 is supposed to be the time gap
                                                                                                                    //// From the JSON Data of the meeting				
				<div style = {{display:'flex', flexDirection:'column',height:'3rem',width:'100%', marginBottom:'0rem',borderTop:'1px solid black',borderLeft:'1px solid black',borderRight:'1px solid black',borderBottom: index !== data.time_gap -1 ? '0px' : '1px solid black',position:'relative'}} className="meeting_split_times_container" key={index+"data8"}>
				<div style={{position:'absolute',transform:'translate(-80%,-2%)',zIndex:'-2',height: info.last_meeting_shedule === true ? '3.7rem' : 'inherit',width:'inherit',display:'flex', flexDirection:'column', border:'1px solid red'}} >

                
				<div style={{fontSize:'0.7rem',height:'25%'}}>{info.time_sheduled}</div>
				<div style={{height:'25%'}}></div>
				<div style={{height:'25%'}}></div>
				<div style={{paddingTop:'1rem',fontSize:'0.7rem',height:'25%'}}>{info.last_meeting_shedule === true && info.last_meeting_shedule_time }</div>
				
				</div>
				

				
				{
				
            info.members_time_picks.map((info,indexx)=>{
			return(	
			 
				<span style={{height:'25%',width:'100%',border:'0px solid red',borderBottom:indexx === 1 ? '1px solid grey' : '0px solid grey', borderStyle:'dashed',
				backgroundColor: info.members_choosed_time.length > 0 && info.members_choosed_time.indexOf(userAcctInfo.userName) !== -1 ? 
				'rgb(51, 153, 0)' : info.members_choosed_time.length > 0 && info.members_choosed_time.indexOf(userAcctInfo.userName) === -1 ? 
				'lightgreen' : '' }} onClick={()=> { addTime(info.time_picked)}} onMouseOver={()=> { addTimeHover(info.time_picked); similarTimePicks(info.members_choosed_time)}} key={indexx+"data9"}  ref = {(firstRowTime)=> timePicksFirst.current[indexx]
				= firstRowTime}  ></span>
			
				)
				
			})		
				}
				
				</div>
				:
				<div style = {{display:'flex', flexDirection:'column',height:'3rem',width:'100%', marginBottom:'0rem',borderTop:'1px solid black',borderLeft:'1px solid black',borderRight:'1px solid black',borderBottom: index !== data.time_gap -1 ? '0px' : '1px solid black',position:'relative'}} key={index+"data10"} >
		
					{
				
            info.members_time_picks.map((info,i)=>{
			return(	
			  
				<span style={{height:'25%',width:'100%',border:'0px solid red',borderBottom:i === 1 ? '1px solid grey' : '0px solid grey', 
				borderStyle:'dashed', backgroundColor:  info.members_choosed_time.length > 0 && info.members_choosed_time.indexOf(userAcctInfo.userName)
				!== -1 ? 'rgb(51, 153, 0)' : info.members_choosed_time.length > 0 && info.members_choosed_time.indexOf(userAcctInfo.userName) === -1 ? 'lightgreen' : ''  }} 
				onClick={()=> { addTime(info.time_picked) }} onMouseOver={()=> { addTimeHover(info.time_picked);similarTimePicks(info.members_choosed_time)}} key={i+"data11"} ></span>
			
				)
				
			})		
				}
			
				</div>
			}
				</div>
				 )
				})
			
			    }
			</div>
			
			</div>
			
			</div>
			
			)
			})
			)
		    })
			
			
			}
			
	   
		
		</div>
		
		//////////// END OF THE USER AVAILABILITY DISPLAY
		
		
		<div>{watTimeDate}</div>
		<br />
		<br />
		//Avaialable members: PLS MAKE NAMES DISPLAY ROW BY ROW
		<div >{memberWithSimilarTimes}</div>
		
		<br />
		<br />
		<br />
		
		
		
		////MEETING TIME/DATE PICKER FOR USERS
		
		<div style={{ display:'flex', flexDirection:'row',width:'fit-content',border:'1px solid red',margin:'auto'}}>
	
     	{   user_meeting_shedule_data_template.map((data,indexMain)=>{
			return (
			data.user_meeting_template_doc.map((info,indx)=>{
			return(
			
			<div key={indx + 'data4'}>
			
			<div style={{width:'5rem',margin:'2px',border:'1px solid blue'}}>
			<div> {info.date.split(' ')[2]} {info.date.split(' ')[1]}</div>
			<div> {info.date.split(' ')[0].toUpperCase().slice(0,1)}{info.date.split(' ')[0].slice(1)}</div>
			</div>
			<div style={{display:'flex', flexDirection:'column',margin:'2px',border:'0px solid green'}} onClick={()=>{addDate(info.date,data.id,data.user_meeting_template_doc)}} onMouseOver={()=>{addDateHover(info.date)}} >
			
		
			<div key = {indx + 'data5'}>
			{
				info.sheduled_time.map((info,index)=>{
				return(
				<div style={{display:'flex', flexDirection:'row'}} key={index+"data7"}> 
			
			{
				indx === 0 ?                                                                                        ////borderBottom: index !== 6 ? '0px' | The 6 is supposed to be the time gap
                                                                                                                  //// From the JSON Data of the meeting				
				<div style = {{display:'flex', flexDirection:'column',height:'3rem',width:'100%', marginBottom:'0rem',borderTop:'1px solid black',borderLeft:'1px solid black',borderRight:'1px solid black',borderBottom: index !== data.time_gap -1 ? '0px' : '1px solid black',position:'relative'}} className="meeting_split_times_container" key={index+"data8"}>
				<div style={{position:'absolute',transform:'translate(-80%,-2%)',zIndex:'-2',height: info.last_meeting_shedule === true ? '3.7rem' : 'inherit',width:'inherit',display:'flex', flexDirection:'column', border:'1px solid red'}} >

				<div style={{fontSize:'0.7rem',height:'25%'}}>{info.time_sheduled}</div>
				<div style={{height:'25%'}}></div>
				<div style={{height:'25%'}}></div>
				<div style={{paddingTop:'1rem',fontSize:'0.7rem',height:'25%'}}>{info.last_meeting_shedule === true && info.last_meeting_shedule_time }</div>
				
				</div>
				

				
				{
				
            info.members_time_picks.map((info,indexx)=>{
			return(	
			 
				<span style={{height:'25%',width:'100%',border:'0px solid red',borderBottom:indexx === 1 ? '1px solid grey' : '0px solid grey', borderStyle:'dashed',
				backgroundColor: info.members_choosed_time.length > 0 && info.members_choosed_time.indexOf(userAcctInfo.userName) !== -1 ? 
				'rgb(51, 153, 0)' : info.members_choosed_time.length > 0 && info.members_choosed_time.indexOf(userAcctInfo.userName) === -1 ? 
				'lightgreen' : '' }} onClick={()=> { addTime(info.time_picked)}} onMouseOver={()=> { addTimeHover(info.time_picked); similarTimePicks(info.members_choosed_time)}} key={indexx+"data9"}  ref = {(firstRowTime)=> timePicksFirst.current[indexx]
				= firstRowTime} className='smallTimeBlocks' ></span>
			
				)
				
			})		
				}
				
				</div>
				:
				<div style = {{display:'flex', flexDirection:'column',height:'3rem',width:'100%', marginBottom:'0rem',borderTop:'1px solid black',borderLeft:'1px solid black',borderRight:'1px solid black',borderBottom: index !== data.time_gap -1 ? '0px' : '1px solid black',position:'relative'}} key={index+"data10"} >
		
					{
				
            info.members_time_picks.map((info,i)=>{
			return(	
			  
				<span style={{height:'25%',width:'100%',border:'0px solid red',borderBottom:i === 1 ? '1px solid grey' : '0px solid grey', 
				borderStyle:'dashed', backgroundColor:  info.members_choosed_time.length > 0 && info.members_choosed_time.indexOf(userAcctInfo.userName)
				!== -1 ? 'rgb(51, 153, 0)' : info.members_choosed_time.length > 0 && info.members_choosed_time.indexOf(userAcctInfo.userName) === -1 ? 'lightgreen' : ''  }} 
				onClick={()=> { addTime(info.time_picked) }} onMouseOver={()=> { addTimeHover(info.time_picked);similarTimePicks(info.members_choosed_time)}} key={i+"data11"} className='smallTimeBlocks'></span>
			
				)
				
			})		
				}
			
				</div>
			}
				</div>
				 )
				})
			
			    }
			</div>
			
			</div>
			
			</div>
			
			)
			})
			)
		    })
			
			
			}
			
	   
		
		</div>
		
		
		//// END OF MEETING TIME/DATE PICKER FOR USERS
		<br />
		<br />
		<br />
		
    </div>
	

  );
}

export default App;
