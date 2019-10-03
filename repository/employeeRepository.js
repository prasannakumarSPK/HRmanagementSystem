const Employee = require('../model/employee');

class EmployeeRepository{

	getAllEmployees(){
		return Employee.find({}).then(employees=>employees)
	}

	addEmployee(employeeData){
		
		return Employee.create(employeeData).then(emp => emp).catch(error => console.log(error))

	}

	update_activeStatus(active_status,id){
		console.log("status is:"+active_status);
		return Employee.findOneAndUpdate(
			{"_id":id},
			{$set:{activeStatus:active_status}}
			)
	}

	update_attendanceStatus(attendance_status,id){
		console.log("attendance is:"+attendance_status);
		return Employee.findOneAndUpdate(
			{"_id":id},
			{$set:{attendance:attendance_status}}
			)
	}

	update_EmployeeDetails(data,id){
		console.log("status is:"+data);
		return Employee.findOneAndUpdate(
			{"_id":id},
			{$set:{username:data.username,password:data.password,employeeId:data.employeeId,firstName:data.firstName,lastName:data.lastName,position:data.position}}
			)
	}
}


module.exports = new EmployeeRepository();

