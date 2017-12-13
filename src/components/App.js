import React, { Component } from 'react';
import Entry from './Entry';
import axios from 'axios';
import Entries from './Entries';
import Login from './Login';
import { app, base } from '../base';
import { Router, Route, browserHistory } from 'react-router';
import { Redirect } from 'react-router-dom';
import Logout from './Logout';
import Specific from './Specific';


function AuthenticatedRoute({component: Component, loggedIn, ...rest}) {
	console.log(loggedIn);
	return (
		<Route {...rest} 
		render = {(props) => loggedIn === true 
			?<Component{...props} {...rest}/>
			: <Redirect to= '/' /> }
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
		this.onDelete = this.onDelete.bind(this);
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
  		return s.split('').reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
	}

	onSave() {
    console.log('hello');
    console.log(document.getElementById('postTitle').innerHTML);
    console.log(document.getElementById('postText').innerHTML);
    var d = new Date();
    var theDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
    const entries = {...this.state.entries}
    const id = this.hashCode('' + this.state.currentUser.uid + Date.now()) //make better
    entries[id] = {
    	id: id,
    	title: document.getElementById('postTitle').innerHTML.replace(/&nbsp;/g,''),
    	text: document.getElementById('postText').innerHTML.replace(/&nbsp;/g,''),
    	date: theDate,
    	time: d.getTime(),
    	owner: this.state.currentUser.uid,
    	background: document.getElementById('diary').style.backgroundImage
    }
    this.setState({entries});
    browserHistory.push('/entries');
    //mongo
		axios.post('http://localhost:3001/api/posts', {
		author: this.state.currentUser.uid,
		text:document.getElementById('postText').innerHTML.replace(/&nbsp;/g,''),
		title: document.getElementById('postTitle').innerHTML.replace(/&nbsp;/g,''),
		time: d.getTime(),
		key: id 
		})
		.then(function(res) {
		console.log('signed up');
		})
		.catch(function(err) {
		console.log('sign up error' + err);
		})	
	}

	onDelete(entries,id) {
		this.setState({entries: {[id]: null}});
	}

	updateEntry() {
		return this.state.entries;
	}

  render() {
    return (
    	<div className = 'text-center' style ={{maxWidth: '1350px'}}>
	    	<Router history = {browserHistory}>
	    		<div> Why is there nothing here</div>
		    	<Route path = '/' component = {Login} url = 'http://localhost:3001/api/users' loggedIn = {this.state.loggedIn}/>
		    	<AuthenticatedRoute path = '/entries' component={Entries} thePosts = {this.state.entries} loggedIn = {this.state.loggedIn} del = {this.onDelete}/>
		    	<Route exact path = '/logout' component={Logout} />
		    	<Route path = '/newEntry' component={Entry} save = {this.onSave} loggedIn = {this.state.loggedIn} />
		    	<Route path = '/specific/:entryId' component = {Specific} update = {this.updateEntry}/>
		    	<Route path = '*'  component={NotFound}/>
		    </Router>
	    </div>
    );
  }
}

const NotFound = () => (
  <h1>404... This page is not found!</h1>
  )

export default App;
