const {MongoClient} = require("mongodb");
const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({

  username:{
    type: String,
    required: [true, "Please provide a username"],
    unique: [true, "Username Exist"],
	trim: true,
  },

  password: {
    type: String,
    required: [false, "Please provide a password!"],
    unique: false,
	min: 6,
    max: 12
  },	
  created_on:{
   type: Date,
   default: Date.now,
  },
  projects:{type: [Object],default: [Object],}
 
	
	
})


module.exports = mongoose.model("users", userSchema);