import React, { Component } from 'react';
import { base } from '../base';

class Entries extends Component {

	constructor(props){
		super(props);
		this.state = {
			entries:[]
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
	     {
	     	entryIds.map((id) => {
				console.log(entries[id].title);
				return(
					<div key={id} className ="col-lg-8 col-lg-offset-2">
						<h1>{entries[id].title}</h1>
						<p>{entries[id].text}</p>
						<hr style = {{marginTop: "10px", marginBottom: "10px", borderColor: "black"}}/>
					</div>
				)
			})

	     }
	    </div>
    );
  }
}

export default Entries;