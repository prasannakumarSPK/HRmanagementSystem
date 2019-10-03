import * as React from 'react';
import {BrowserRouter as Router,Link} from 'react-router-dom';

const Header:React.FC = ()=>{
    return (
        <Router>
 <nav className='navbar navbar-default'>
    <div className='container-fluid'>
    <ul className='nav navbar-nav'>
    <li><Link to="/home">Home</Link></li>
<li><Link to="/reports">Reports</Link></li>
    
    </ul>
    </div>
    </nav>
        </Router>
    )
}


export default Header;