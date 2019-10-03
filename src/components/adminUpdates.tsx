import * as React from 'react';


interface AdminUpdateProps{
    users:number;
    active:number;
    inactive:number;

}

const AdminUpdates:React.FC<AdminUpdateProps>=(props)=>{
    return(
        <div>
               Users : <input   name="users" value={props.users}/>
               Active : <input  name="active" value={props.active}/>
               InActive :<input  name="inactive" value={props.inactive} />
           </div>
    )
}


export default AdminUpdates;