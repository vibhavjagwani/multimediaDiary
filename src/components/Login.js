import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory} from 'react-router';
import { app,facebookProvider, googleProvider } from '../base';


const styles = {
	width: '80%',
	maxWidth: '320px',
	margin: '20px auto',
	padding: '10px',
}

const boxStyles = {
	maxWidth: '340px',
	margin: '20px auto',
	padding: '5px',
	border: 'none',
	backgroundColor: 'transparent',
	borderRadius: '5px'
}

class Login extends Component {

	constructor(props) {
		super(props);
		this.handleLogin = this.handleLogin.bind(this);
		this.state = {data: [], redir: false, username:'', password:'', email:'', confirmPassword: '', error: false};
		this.handleUsername = this.handleUsername.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
		this.registerUsername = this.registerUsername.bind(this);
		this.registerPassword = this.registerPassword.bind(this);
		this.registerConfirmPassword = this.registerConfirmPassword.bind(this);
		this.authWithFacebook = this.authWithFacebook.bind(this);
		this.authWithGoogle = this.authWithGoogle.bind(this);
	}
	handleUsername(e) {
		this.setState({username: e.target.value});
	}
	handlePassword(e) {
		this.setState({password: e.target.value});
	}
	registerUsername(e) {
		this.setState({username: e.target.value});
	}
	registerPassword(e) {
		this.setState({password: e.target.value});
	}
	registerConfirmPassword(e) {
		this.setState({confirmPassword: e.target.value});
	}
	authWithFacebook() {
		console.log('auth with facebook');
		app.auth().signInWithPopup(facebookProvider)
		.then((result) => {
				browserHistory.push('/entries');
		})
		.catch((error) => {
			console.log('error' + error);
			this.setState({error: true});
		})
	}

	authWithGoogle() {
		console.log('auth with google');
		app.auth().signInWithPopup(googleProvider)
		.then((result) => {
				browserHistory.push('/entries');
		})
		.catch((error) => {
			console.log('error' + error);
			this.setState({error: true});
		})
	}
	handleLogin(e,props) {
		e.preventDefault();
		let username = this.state.username;
		let password = this.state.password;
		console.log(username+ '  ');
		if(!username || !password) {
			this.setState({error: 'Fill out all fields'});
			return;
		}
		axios.get(this.props.route.url + '?user=' + username)
		.then(function(res){
			console.log(res);
			console.log('hello');
		})
		.catch(function(err) {
			console.log(err);
		}) 
	}
	handleSignUp(e) {
		e.preventDefault();
		console.log('hello');
		let username = this.state.username;
		let password = this.state.password;
		let confirmPassword = this.state.confirmPassword;
		let url = this.props.route.url;
		if(!username  || !password || !confirmPassword) {
			this.setState({error: 'Fill out all fields'});
			return;
		}
		if(password !== confirmPassword) {
			this.setState({error: 'passwords do not match'});
			return;
		}
		axios.get(this.props.route.url +'/', {
			params: {
				user: username
			}
		})
		.then(function(res) {
			console.log(res.data[0].user);
			if(res.data[0] === username) {
			console.log('user already taken');
			console.log(res);
			return;
			}
			else {
				axios.post(url, {
				user: username,
				password: password,
				})
				.then(function(res) {
				console.log('signed up');
				})
				.catch(function(err) {
				console.log('sign up error' + err);
				})	
			}
		})
	}

  render() {
    return (
    	<div>
    	<div className='diary' style = {{maxHeight: '665px', backgroundImage: 'none', backgroundColor: '#3F4C90'}} id='back'>
    		<div style = {boxStyles}>
    				<h1 style = {{color: 'white'}}> Media Diary </h1>
    				<div style = {styles}>
	    		    	 <button style ={{width:'100%', backgroundColor: '#769FB6', border: 'none'}} className= 'btn btn-primary' onClick = {() => {this.authWithFacebook()}}>
	    		    	 	Log in with Facebook
	    		    	 </button>
	    		    	 <hr style = {{marginTop:'10px', marginBottom:'10px', borderColor: 'white'}}/>
	    		    	 <button style ={{width:'100%', marginBottom: '30px', backgroundColor: '#188FA7', border: 'none'}} className= 'btn btn-success' onClick = {() => {this.authWithGoogle()}}>
	    		    	 	Log in with Google
	    		    	 </button>
    		    	 </div>
    		</div>
    		<p style ={{color: 'white'}}> vjagwani - CIS 197 project </p>
    		{
    			this.state.error ?
    			<p style = {{color:'red'}}>Your credentials are already authorized with a different service</p> :
    			null
    		}
		</div>
		</div>
    );
  }
}

// const LoginOldVersion = (
// 	<div>
//     	<form onSubmit={(event) => {this.authWithEmail(event)}} ref={(form) => {this.loginForm = form}}>
//     		<input type="email" onChange = {this.handleUsername} name="username" id="username" tabIndex="1" 
//     		className="form-control" placeholder="Email" ref ={(input) => {this.emailInput = input}}/>
//     		<input type="password" onChange = {this.handleUsername} name="password" id="password" tabIndex="1" 
//     		className="form-control" placeholder="password" ref ={(input) => {this.passwordInput = input}}/>
//     		<input type="submit" className ="btn-register" value = "Log In"/>
//     	</form>
// 	<div className="row">
// 			<div className="col-md-6 col-md-offset-3">
// 				<div className="panel panel-login" style = {{border:"1px solid black", padding: "15px"}}>
// 					<div className="panel-heading">
// 						<div className="row">
// 							<div className="col-xs-6 panel-active" id = "login-form-linkdiv">
// 								<a href="#" className="active" id="login-form-link">Login</a>
// 							</div>
// 							<div className="col-xs-6" id="register-form-linkdiv">
// 								<a href="#" id="register-form-link">Register</a>
// 							</div>
// 						</div>
// 					</div>
// 					<div className="panel-body">
// 						<div className="row">
// 							<div className="col-lg-12">
// 								<form id="login-form" action="" method="get" role="form" style={{display: "block"}}>
// 									<div className="form-group">
// 										<input type="email" onChange = {this.handleUsername} name="username" id="username" tabIndex="1" className="form-control" placeholder="Email"/>
// 									</div>
// 									<div className="form-group">
// 										<input type="password" onChange = {this.handlePassword} name="password" id="password" tabIndex="2" className="form-control" placeholder="Password"/>
// 									</div>
// 									<div className="form-group">
// 										<div className="row">
// 											<div className="col-sm-6 col-sm-offset-3">
// 												<input type="submit" name="login-submit" onClick ={this.handleLogin}
// 												id="login-submit" tabIndex="4" className="form-control btn btn-login" value="Log In" />
// 											</div>
// 										</div>
// 									</div>
// 								</form>
// 								<form id="register-form" action="" method="post" role="form" style={{display: "none"}}>
// 									<div className="form-group">
// 										<input type="email" name="username" onChange = {this.registerUsername} id="username" tabIndex="1" className="form-control" placeholder="Email"/>
// 									</div>
// 									<div className="form-group">
// 										<input type="password" name="password" id="password" onChange = {this.registerPassword} tabIndex="2" className="form-control" placeholder="Password"/>
// 									</div>
// 									<div className="form-group">
// 										<input type="password" name="confirm-password" id="confirm-password" onChange = {this.registerConfirmPassword} tabIndex="2" className="form-control" placeholder="Confirm Password"/>
// 									</div>
// 									<div className="form-group">
// 										<div className="row">
// 											<div className="col-sm-6 col-sm-offset-3">
// 												<input type="submit" name="register-submit" id="register-submit" tabIndex="4" className="form-control btn btn-register" value="Register Now" onClick ={this.handleSignUp}/>
// 											</div>
// 										</div>
// 									</div>
// 								</form>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 		</div>
// )
export default Login;