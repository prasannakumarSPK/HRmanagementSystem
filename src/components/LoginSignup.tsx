import * as React from 'react';
import {IEmployee} from '../model/employee';
import HrmsService from '../services/hrmsService';
import {Link,withRouter, RouteComponentProps, Route, Redirect,Switch} from 'react-router-dom';
import {AdminHome} from './adminHome';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

interface IEmployeestate{
    
    EmployeeList:IEmployee[];
    username:string;
    password: string;
    // fields:any;
    // check:boolean;
    formdata:{username:string,password:string,employeeId:string,firstName:string,lastName:string,position:string,activeStatus:string,attendance:string}
    
}

export class LoginSignup extends React.Component<{},IEmployeestate>{
    constructor(props: any){
        super(props);
        this.state = {
            EmployeeList : [],
            username:"",
            password:"",
            formdata:{username:'',password:'',employeeId:'',firstName:'',lastName:'',position:'',activeStatus:'',attendance:''}
            
        }
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleSignup=this.handleSignup.bind(this);
        this.ValidatePwdMatching = this.ValidatePwdMatching.bind(this)
    }

        componentDidMount(){
            HrmsService.apiCall().subscribe((employees: IEmployee[])=>
            this.setState({EmployeeList:employees})
            )
        }

        // onClick={(event) => this.handleClick(event)}


      
        handleSubmit=(event:any)=> {
            
            event.preventDefault();
            // console.log(this.state.username);
              let employee = this.state.EmployeeList.filter(emp => emp.username === this.state.username && emp.password === this.state.password);
              console.log(employee);
              if(employee.length > 0){
                // history.push('/welcome',state:{'abc':'welcome'})
                // history.push( '/welcome',{ 'page_id': 1, 'user_id': 5 });
                // window.location.reload();
                // return <Redirect to={{ pathname: "/welcome" }} />;
            //    return  <Redirect to="/welcome" />
                // 
                // <Route path='/register' component={AdminHome} />
                localStorage.setItem('loggedin',"true");
                localStorage.setItem('user',this.state.username)
                // localStorage.setItem('employee',this.state.formdata.firstName)
                if(employee[0].position==="admin"){
                    history.push('/admin');
                    window.location.reload()
                }
                else if(employee[0].position==="MANAGER"){
                    history.push('/HRmanager');
                    window.location.reload()
                }
                else if(employee[0].position==="EMPLOYEE"){
                    history.push('/employee');
                    window.location.reload()
                }
                else{
                    alert("something wrong!!..try again")
                    this.setState({username:"",password:""})
                }
                
                  
                
              }
              else{
                alert("enter correct credentials")
               this.setState({username:"",password:""})
              }
            
            
          }

          handleSignup=(event:any)=>{
                event.preventDefault();
                HrmsService.postEmployee(this.state.formdata).subscribe(()=>console.log("sign up successfull"));
                alert("successfully registered!!");
                window.location.reload();
                // let formdata = {...this.state.formdata} 
                // formdata.username=""
                // formdata.password=""
                // formdata.employeeId=""
                // formdata.firstName=""
                // formdata.lastName=""
                // formdata.position=""
                // this.setState({formdata})
                
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
    
        handleInputChange=(event:any)=>{         
           
            let formdata = {...this.state.formdata} 

            const x=event.target;
            
            if(x.name==="username")
                this.setState({username:x.value})
               
            if(x.name==="password")
                this.setState({password:x.value})


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
    <div>
                <h1> <i>Welcome to HRMS !!!</i></h1>
                
                <h3>LOGIN HERE</h3>
            <form  onSubmit={this.handleSubmit}>
                    {/* <h1>Hello {this.state.username} {this.state.age}</h1> */}
                    <p>Enter your username:</p>
                    <input
                    type='text'
                    name='username'
                    onChange={this.handleInputChange}
                    value={this.state.username}
                        />
                        <p>Enter your password:</p>
                        <input
                            type='password'
                            name='password'
                            onChange={this.handleInputChange} value={this.state.password}
                        />
                                <br></br>
                        <input type="submit" value="Submit" />
            </form>
            <hr/>
            <h2>sign up</h2>
            <form onSubmit={this.handleSignup}>
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