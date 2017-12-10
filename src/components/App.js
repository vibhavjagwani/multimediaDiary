import React, { Component } from 'react';
import Button from './Button';
import Entry from './Entry';
import axios from 'axios';
import Entries from './Entries';
import Login from './Login';
import { app, base } from '../base';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import { Redirect } from 'react-router-dom';
import Nav from './Nav';
import Logout from './Logout';
import Specific from './Specific';


function AuthenticatedRoute({component: Component, loggedIn, ...rest}) {
	console.log(loggedIn);
	return (
		<Route {...rest} 
		render = {(props) => loggedIn === true 
			?<Component{...props} {...rest}/>
			: <Redirect to= "/" /> }
			/>
		) 
}

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			newEntryDisplay: 'inline-block',
			oldEntryDisplay: 'inline-block',
			loggedIn: false,
			entries:[],
			currentUser:null
		};
		this.makeNewEntry = this.makeNewEntry.bind(this);
		this.updateEntry = this.updateEntry.bind(this);
		this.onSave = this.onSave.bind(this);
	}

	componentWillMount() {
		this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
			if(user) {
				this.setState({
					loggedIn: true,
					currentUser: user
				});
				this.entriesRef = base.syncState('entries/' + user.uid, {
					context: this,
					state: 'entries'
				});
			} else {
				this.setState({
					loggedIn: false,
					currentUser: null
				});
				base.removeBinding(this.entriesRef);
			}
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
    const id = this.hashCode("" + this.state.currentUser.uid + Date.now()) //make better
    entries[id] = {
    	id: id,
    	title: document.getElementById('postTitle').innerHTML,
    	text: document.getElementById('postText').innerHTML,
    	date: theDate,
    	time: d.getTime(),
    	owner: this.state.currentUser.uid
    }
    this.setState({entries});
    browserHistory.push('/entries');
  }

	updateEntry() {
		return this.state.entries;
	}

  render() {
    return (
    	<div className = "text-center" style ={{maxWidth: '1350px'}}>
	    	<Router history = {browserHistory}>
	    		<div> Why is there nothing here</div>
		    	<Route path = "/" component = {Login} url = 'http://localhost:3001/api/users' poll = {2000} loggedIn = {this.state.loggedIn}/>
		    	<AuthenticatedRoute path = "/entries" component={Entries} thePosts = {this.state.entries} loggedIn = {this.state.loggedIn}/>
		    	<Route exact path = "/logout" component ={Logout}/>
		    	<Route path = "/newEntry" component={Entry} save = {this.onSave} loggedIn = {this.state.loggedIn} />
		    	<Route path = "/specific/:entryId" component = {Specific} update = {this.updateEntry}/>
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
