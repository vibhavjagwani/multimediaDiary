import React, { Component } from 'react';
import Button from './Button';
import Entry from './Entry';
import axios from 'axios';
import Entries from './Entries';
import Login from './Login';
import { app, base } from '../base';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Nav from './Nav';
import Logout from './Logout';


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			newEntryDisplay: 'inline-block',
			oldEntryDisplay: 'inline-block',
			loggedIn: false,
			entries:[]
		};
		this.makeNewEntry = this.makeNewEntry.bind(this);
		this.seeOldEntry = this.seeOldEntry.bind(this);
		this.onSave = this.onSave.bind(this);
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

		this.entriesRef = base.syncState('entries', {
			context: this,
			state: 'entries'
		})
	}

	componentWillUnmount() {
		this.removeAuthListener();
		base.removeBinding(this.entriesRef);
	}

	makeNewEntry() {
		this.setState({newEntryDisplay: 'none'});
	}

	hashCode(s){
  		return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
	}

	onSave() {

    console.log('hello');
    console.log(document.getElementById('postTitle').innerHTML);
    console.log(document.getElementById('postText').innerHTML);
    var d = new Date();
    var theDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
    const entries = {...this.state.entries}
    const id = this.hashCode("" + Date.now()) //make better
    entries[id] = {
    	id: id,
    	title: document.getElementById('postTitle').innerHTML,
    	text: document.getElementById('postText').innerHTML,
    	date: theDate
    }
    this.setState({entries});
  }

	seeOldEntry() {


	}

  render() {
    return (
    	<div className = "text-center" style ={{maxWidth: '1350px'}}>
	    	<Router history = {browserHistory}>
	    		<div> Why is there nothing here</div>
		    	<Route path = "/" component = {Login} url = 'http://localhost:3001/api/users' poll = {2000} loggedIn = {this.state.loggedIn}/>
		    	<Route path = "/entries" component={Entries} thePosts = {this.state.entries} loggedIn = {this.state.loggedIn}/>
		    	<Route exact path = "/logout" component ={Logout}/>
		    	<Route path = "/newEntry" component={Entry} save = {this.onSave} loggedIn = {this.state.loggedIn}/>
		    	<Route path = "*"  component={NotFound}/>
		    </Router>
	    </div>
    );
  }
}

const NotFound = () => (
  <h1>404.. This page is not found!</h1>)

const Home = () => (
	<div className = "text-center" style ={{maxWidth: '1350px'}}>
	      <div className = "diary" style = {{display: this.state.newEntryDisplay}}>
	       <h1> My diary </h1>
	       <div>
	       		<Link to = "/login"> Go to login</Link>
	       </div>
	       <Route exact path="/login" render= {() => <Login url = 'http://localhost:3001/api/posts' poll = {2000} loggedIn = {this.state.loggedIn}/>} />
	       <div className ="rowButt row">
	       	<Button name = "New entry" action={this.makeNewEntry} stile = {this.state.newEntryDisplay}></Button>
	       	<Button name = "See old entries" onClick = {this.seeOldEntry} style = {{display: this.state.oldEntryDisplay}}></Button>
	       </div>
	      </div>
	      <div className = "text-center">
	      {
	       		this.state.newEntryDisplay === 'none'?
	       		<Entry save = {this.onSave} /> : <div></div>
	       	}
	      </div>
	    </div>
)
export default App;
