const employeeRepository = require('../repository/employeeRepository');


module.exports = (app)=>{

    app.get('/employees',(req,res)=>{
        employeeRepository.getAllEmployees()
        .then(employees=>res.json(employees))
    })
    
    app.post('/employees',(req,res)=>{
        employeeRepository.addEmployee(req.body)
        .then(employee=>res.json(employee))
    })


    app.put('/employees/:id',(req,res)=>{
        // console.log("***************************");
        var x = req.body;
        console.log("////"+x.flag);

        if(x.flag==='1'){
            employeeRepository.update_activeStatus(x.status,req.params.id)
            .then(result=>res.json(result)) 
        }
        if(x.flag==='2'){
            employeeRepository.update_attendanceStatus(x.attendance,req.params.id)
            .then(result=>res.json(result))  
        }

        if(x.flag==='3'){
            employeeRepository.update_EmployeeDetails(req.body,req.params.id)
            .then(result=>res.json(result))  
        }
        


        })

    

}