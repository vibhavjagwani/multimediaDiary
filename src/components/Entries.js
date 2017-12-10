import React, { Component } from 'react';
import { base } from '../base';
import Nav from './Nav';

class Entries extends Component {

	constructor(props){
		super(props);
		this.state = {
			entries:[],
			loggedIn: this.props.route.loggedIn
		}
	}
	componentWillMount() {
		this.entriesRef = base.syncState('entries', {
			context: this,
			state: 'entries'
		})
	}

	componentWillUnmount() {
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
						<div className = "col-lg-3"> <h1>{entries[id].date} </h1></div>
						<div className = "col-lg-5"><h1>{entries[id].title}</h1> </div>
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