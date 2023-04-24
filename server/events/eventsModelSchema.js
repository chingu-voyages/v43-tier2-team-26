const {MongoClient} = require("mongodb");
const mongoose = require('mongoose')



const eventsSchema = new mongoose.Schema({
	_id : {
        type: String,
        required: true
    },

  meeting_title:{
    type: String,
    required: [true, "Please a an event tittle"],
	trim: true,
  },
  
	
  created_on:{
   type: Date,
   default: Date.now,
  },
  active:{
  type:Boolean,
  default: true,
  },
  meeting_url:{type:String},
  
  time_gap:{type:Number},
  
  //days_gap:{type:Number},
  
  time:{
  type: String,
  required: [true, "Please add time!"]
  },
  
  time_from:{
  type: String,
  required: [true, "Please add time!"]
  },
  
  time_to:{
  type: String,
  required: [true, "Please add time!"]
  },
  
  date_from:{
  type: String,
  required: [true, "Please add date"]
  },
  
  date_to:{
  type: String,
  required: [true, "Please add date"]
  },
  
  date_duration:{
  type: String,
  required: [true, "Please add date"]
  },
  
  time_zone:{
   type: String,
   required: [true, "Please add a time zone"],
  },
  
  meeting_data:{ 
	type : [],
  },
  usser_meeting_data:{ 
	type : [],
  },
  
  meeting_event_creator:{type: String},
  
  team_members:{type: [{name : {type:String},time_zone:{type:String},location:{type:String},created_on:{type: Date,default: Date.now},
  event_title:{type:String},team_member:{type:String},time:{type:String},event_day:{type:Date},event_d:{String},team_member:{type:String}
  }]
  },
  team_members_user_names:{type:[]}
 
	
	
})


module.exports = mongoose.model("meetings_docs",  eventsSchema);


