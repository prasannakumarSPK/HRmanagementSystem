
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
	username: String, 
	password: String,
	 employeeId : String,
	 firstName : String,
	 lastName : String,
	  position : String, 
	activeStatus : String,
	 attendance: String
})

module.exports = mongoose.model('Employee',employeeSchema);




