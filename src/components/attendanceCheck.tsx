import * as React from 'react';

interface AttendanceUpdateProps{
    punctualCount : number;
    tardyCount : number;    
    absenteeCount : number;
    
}

const AttendanceCheck:React.FC<AttendanceUpdateProps>=(props)=>{

    return(

        <div className='row'>
            
            <div className='col-md-6'>

            <div className='row'> 
            <div className='col-md-2'>

            <input type='text' value={props.punctualCount}  size={4}/> </div>
            <div className='col-md-2'>
            <input type='text' value={props.tardyCount} size={4} /> </div>
            <div className='col-md-2'>
            <input type='text' value={props.absenteeCount}  size={4}/>
            </div>
            </div>
            
            <div className='row'>         
            <div className='col-md-2'>Punctual</div>
            <div className='col-md-2'>Tardy</div>
            <div className='col-md-2'>Absentee</div> 
            <div
                style={{
                width: '400px',
                height: '300px'
                }}
            >
           </div>
            </div> 
           </div>
          

        </div>


    )
}

export default AttendanceCheck;