import React, { Component } from 'react';
import Button from './Button'
import Entry from './Entry'
import axios from 'axios';


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			newEntryDisplay: 'inline-block',
			oldEntryDisplay: 'inline-block'
		};
		this.makeNewEntry = this.makeNewEntry.bind(this);
		this.seeOldEntry = this.seeOldEntry.bind(this);
	}

	makeNewEntry() {
		this.setState({newEntryDisplay: 'none'});
	}

	seeOldEntry() {


	}

  render() {
    return (
    	<div className = "text-center" style ={{maxWidth: '1300px'}}>
	      <div className = "diary" style = {{display: this.state.newEntryDisplay}}>
	       <h1> My diary </h1>
	       <div className ="rowButt row">
	       	<Button name = "New entry" action={this.makeNewEntry} stile = {this.state.newEntryDisplay}></Button>
	       	<Button name = "See old entries" onClick = {this.seeOldEntry} style = {{display: this.state.oldEntryDisplay}}></Button>
	       </div>
	      </div>
	      <div className = "text-center">
	      {
	       		this.state.newEntryDisplay === 'none'?
	       		<Entry 
	       		url = 'http:\/\/localhost:3000\/api\/posts' 
	       		poll = {2000} /> : <div></div>
	       	}
	      </div>
	    </div>
    );
  }
}

export default App;
