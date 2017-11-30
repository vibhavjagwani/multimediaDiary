import React, { Component } from 'react';

class Login extends Component {

	constructor(props) {
		super(props);
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleLogin(e) {
		e.preventDefault();
		axios.post(this.props.url,login-form)

	}

  render() {
    return (
    		<div className="container">
    	<div className="row">
			<div className="col-md-6 col-md-offset-3">
				<div className="panel panel-login" style = {{border:"1px solid black", padding: "15px"}}>
					<div className="panel-heading">
						<div className="row">
							<div className="col-xs-6 panel-active" id = "login-form-linkdiv">
								<a href="#" className="active" id="login-form-link">Login</a>
							</div>
							<div className="col-xs-6" id="register-form-linkdiv">
								<a href="#" id="register-form-link">Register</a>
							</div>
						</div>
					</div>
					<div className="panel-body">
						<div className="row">
							<div className="col-lg-12">
								<form id="login-form" action="" method="post" role="form" style={{display: "block"}}>
									<div className="form-group">
										<input type="text" name="username" id="username" tabIndex="1" className="form-control" placeholder="Username" value=""/>
									</div>
									<div className="form-group">
										<input type="password" name="password" id="password" tabIndex="2" className="form-control" placeholder="Password"/>
									</div>
									<div className="form-group">
										<div className="row">
											<div className="col-sm-6 col-sm-offset-3">
												<input type="submit" name="login-submit" onClick ="handleLogin"
												id="login-submit" tabIndex="4" className="form-control btn btn-login" value="Log In" />
											</div>
										</div>
									</div>
								</form>
								<form id="register-form" action="" method="post" role="form" style={{display: "none"}}>
									<div className="form-group">
										<input type="text" name="username" id="username" tabIndex="1" className="form-control" placeholder="Username" value=""/>
									</div>
									<div className="form-group">
										<input type="email" name="email" id="email" tabIndex="1" className="form-control" placeholder="Email Address" value=""/>
									</div>
									<div className="form-group">
										<input type="password" name="password" id="password" tabIndex="2" className="form-control" placeholder="Password"/>
									</div>
									<div className="form-group">
										<input type="password" name="confirm-password" id="confirm-password" tabIndex="2" className="form-control" placeholder="Confirm Password"/>
									</div>
									<div className="form-group">
										<div className="row">
											<div className="col-sm-6 col-sm-offset-3">
												<input type="submit" name="register-submit" id="register-submit" tabIndex="4" className="form-control btn btn-register" value="Register Now"/>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		 </div>
    );
  }
}

export default Login;