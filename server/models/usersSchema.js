const {MongoClient} = require("mongodb");
const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({

  username:{
    type: String,
    required: [true, "Please provide a username"],
    unique: [false, "Username Exist"],
	trim: true,
  },

  password: {
    type: String,
    required: [false, "Please provide a password!"],
    unique: false,
	trim: true,
	min: 6,
    max: 12
  },	
  unique_username:{type: String},
  meeting_id:{type: String},
  meeting_url:{type: String},
  meeting_template:{type: Array},
  meeting_creator:{type: String},
  time_created:{type: String},
  meeting_duration:{type: String},
  time_duration:{type: String},
  time_gap:{type: Number},
  time_zone:{type: String},
  created_on:{
   type: Date,
   default: Date.now,
  },
  projects:{type: [Object],default: [Object],}
 
	
	
})


module.exports = mongoose.model("users", userSchema);