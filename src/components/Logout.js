import React, { Component } from 'react';
import { app } from '../base';
import { browserHistory } from 'react-router';

class Logout extends Component {

	constructor(props){
		super(props);
		this.state = {
			redirect:false
		}
	}
	componentWillMount() {
		app.auth().signOut().then((user) => {
			browserHistory.push('/');
		})
	}
  	render() {
  		return (<div></div>);
  }
}

export default Logout;