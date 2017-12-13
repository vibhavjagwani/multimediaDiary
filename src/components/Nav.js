import React, { Component } from 'react';
import {Link} from 'react-router';
import {app} from '../base';

class Nav extends Component {

	constructor(props){
		super(props);
    this.state = {
      loggedIn: false
    }
	}
  componentWillMount() {
  this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({
          loggedIn: true
        });
      } else {
        this.setState({
          loggedIn: false
        });
      }
    })
  }
  componentWillUnmount() {
    this.removeAuthListener();
  }

  render() {
    return (
  <div className = 'row col-lg-13' style = {{backgroundColor: 'white'}}>
    <nav>
      <div className='nav-wrapper ' style = {{backgroundColor:'none', float:'right', paddingRight: '50px'}}>
      		<ul id='nav-mobile' className='list-inline'>
	      	 	<Link to='/newEntry' className = 'navbarList'>Make Entry</Link>
	        	<Link to='/entries' className = 'navbarList'>Your Entries</Link>
            <Link to='/logout' className = 'navbarList'>Logout</Link>
	        </ul>      		
	    </div>
	  </nav>
	</div>
    );
  }
}

export default Nav;