import * as React from 'react';
import {IEmployee} from '../model/employee';
import HrmsService from '../services/hrmsService';

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

interface IEmployeestate{
    
    EmployeeList:IEmployee[];
    password:string,
    id:string
    
    formdata:{username:string,password:string,employeeId:string,firstName:string,lastName:string,position:string,activeStatus:string,attendance:string}
    
}

export class EmployeeProfile extends React.Component<{},IEmployeestate>{
    constructor(props: any){
        super(props);
        this.state = {
            EmployeeList : [],
            password:'',
            id:'',
            formdata:{username:'',password:'',employeeId:'',firstName:'',lastName:'',position:'',activeStatus:'',attendance:''}
            
        }
    }

    componentDidMount(){
        // let formdata = {...this.state.formdata}
        HrmsService.apiCall().subscribe((emp: IEmployee[])=>{
        let employee: IEmployee[] = emp.filter(p=>p.username.indexOf(String(localStorage.getItem('user')))!==-1)
        this.setState({id:employee[0]._id,formdata:{username:employee[0].username,password:employee[0].password,employeeId:employee[0].employeeId,firstName:employee[0].firstName,lastName:employee[0].lastName,position:employee[0].position,activeStatus:employee[0].activeStatus,attendance:employee[0].attendance}})
        }
        
        )
        
        

        
    }

    updateDetails=(event:any)=>{
        event.preventDefault();
        let x = this.state.formdata;
        HrmsService.updateEmployeeDetails({"username":x.username,"password":x.password,"employeeId":x.employeeId,"firstName":x.firstName,"lastName":x.lastName,"position":x.position,"flag":"3"},this.state.id).subscribe(()=>console.log("update successfull"));
        alert("form update successful");
        localStorage.setItem("loggedin", "false");
        localStorage.removeItem('user');
        localStorage.removeItem('employee')
        history.push('/home')
        window.location.reload()
        
  }

  ValidatePwdMatching=(event:any)=>{
    let x = event.target
    var pwd;
    let cnfpwd;
    

    if(x.name==='cnfpwd'){
        cnfpwd=x.value;
        if(this.state.formdata.password!==cnfpwd)
            alert("password didn't match")
    }
        
    
        
}

logout=()=>{
    // var x = localStorage.getItem('employee')
    alert("Thank u...h've a great day :-)")
        localStorage.setItem("loggedin", "false");
        localStorage.removeItem('user');
        localStorage.removeItem('employee')
        history.push('/home')
        window.location.reload()
}

  handleInputChange=(event:any)=>{         
           
    let formdata = {...this.state.formdata} 

    const x=event.target;
    


    if(x.name==='u_name'){
        
        formdata.username = x.value;
        this.setState({formdata})
    }

    if(x.name==='pwd'){
        
        formdata.password = x.value;
        this.setState({formdata})
    }
    if(x.name==='empId'){
        
        formdata.employeeId = x.value;
        this.setState({formdata})
    }

    if(x.name==='f_name'){
        
        formdata.firstName = x.value;
        this.setState({formdata})
    }
    
    
    if(x.name==='l_name'){
        
        formdata.lastName = x.value;
        this.setState({formdata})
    }
    
    else{// here we set state for signup part
        console.log(x.value);
        
        formdata.position = x.value;
        this.setState({formdata})
    }
}

  render(){
    // if(this.state.check === true)
    //     return (
    //         <div>
    //                 <AdminHome/>
    //         </div>
    //         );

    return(
    <div><h1>Welcome to Employee Page</h1>
    <div>
               <button onClick={this.logout}>logout</button>
           </div>
              
              <h4> <i>you can update your details here:</i> {localStorage.getItem('user')}</h4>
            <form onSubmit={this.updateDetails}>
                <input type="text" placeholder="enter user name" name="u_name" onBlur={this.handleInputChange} defaultValue={this.state.formdata.username} required/>
                <br/>
                <input
                            type='password'
                            name='pwd'
                            onBlur={this.handleInputChange} defaultValue={this.state.formdata.password} placeholder="enter password"  required
                        />
                        <br/>
              
                <input
                            type='password'
                            name='cnfpwd'
                          placeholder="confirm password" onBlur={this.ValidatePwdMatching} defaultValue={this.state.password}  required
                        />
                <br/>
                <input type="text" placeholder="employeeID" name="empId" onBlur={this.handleInputChange} defaultValue={this.state.formdata.employeeId} required/>
                <br/>
                <input type="text" placeholder="first name" name="f_name" onBlur={this.handleInputChange} defaultValue={this.state.formdata.firstName}  required/>
                <br/>
                <input type="text" placeholder="last name" name="l_name" onBlur={this.handleInputChange} defaultValue={this.state.formdata.lastName} required/>
                <br/>
                <select  onChange={this.handleInputChange}> 
                <option>you are</option>
                <option value="EMPLOYEE">EMPLOYEE</option>
                <option value="admin">admin</option>
                <option value="MANAGER">MANAGER</option>
                </select>
                <br></br>
                 <input type="submit" value="Submit" />
                
            </form>
 
        
    </div>
    );
            
    }


  
}