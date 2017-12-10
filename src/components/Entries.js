import React, { Component } from 'react';
import { base } from '../base';
import Nav from './Nav';
import {app} from '../base';
import {browserHistory, Link} from 'react-router';

class Entries extends Component {

	constructor(props){
		super(props);
		this.state = {
			entries:[],
			loggedIn: false
		}
	}
	componentWillMount() {
		this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({
          loggedIn: true
        });
        this.entriesRef = base.syncState('entries/'+ user.uid, {
			context: this,
			state: 'entries'
		});
      } else {
        this.setState({
          loggedIn: false
        });
        browserHistory.push('/');
        base.removeBinding(this.entriesRef);
      }
    })	
	}

	componentWillUnmount() {
		this.removeAuthListener();
		base.removeBinding(this.entriesRef);
	}
 
  render() {
  	const entryIds = Object.keys(this.state.entries);
	const entries = this.state.entries;
    return (
	    <div>
	    <Nav loggedIn = {this.state.loggedIn}/>
	     {
	     	entryIds.map((id) => {
				console.log(entries[id].title);
				return(
					<div key={id}>
					<div className ="col-lg-8 col-lg-offset-3">
					<Link to = {"/specific/" + entries[id].id}>
						<div className = "col-lg-3"> 
							<h1>{entries[id].date} </h1>
						</div>
						<div className = "col-lg-5">
							<h1>{entries[id].title}</h1> 
						</div>
					</Link>
					</div>
					</div>
				)
			})

	     }
	    </div>
    );
  }
}

export default Entries;