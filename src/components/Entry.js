import React, { Component } from 'react';
import Toolbar from './Toolbar';
import Toolbarright from './Toolbarright';
import {browserHistory} from 'react-router';
import {app} from '../base';
import AlertContainer from 'react-alert';
//import ImageUploader from 'react-images-upload';


class Entry extends Component {

	constructor(props){
		super(props);
		this.state = {
			loggedIn: false,
			theme: 'url(../images/papertexture.jpg)',
			error: null,
			pictures: [] 
		}
		this.changeBackgroundTo = this.changeBackgroundTo.bind(this);
		this.showAlert = this.showAlert.bind(this);
		// this.onDrop = this.onDrop.bind(this);
		// this.getPictures = this.getPictures.bind(this);
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
        browserHistory.push('/');
      }
    })
  }
  componentWillUnmount() {
    this.removeAuthListener();
  }
  changeBackgroundTo(url) {
  	this.setState({theme: url});
  }
	matchYoutube(e) {
		var regyoutube = /(http(s)??\:\/\/)?(www\.)?((youtube\.com\/watch\?v=)|(youtu.be\/))([a-zA-Z0-9\-_])+$/;
		if(e.key === ' ') {
			var str = e.target.textContent.toString();
			var x = str.search(regyoutube);
			if(x !== -1 ) {
				var y = str.match(regyoutube)[0].toString().replace('watch?v=','embed/');
				e.target.innerHTML = str.substring(0,x) + '<br/><iframe src="'+ y.toString() +'" width="560"'+ 
				'height="315" frameborder="0" allowfullscreen></iframe><br/>' +  str.substring(x+y.length+2,str.length);
			}
		}
	}

	// onDrop(picture) {
 //        this.setState({
 //            pictures: this.state.pictures.concat(picture),
 //        });
 //        console.log(this.state.pictures);
 //    }
 //    getPictures() {
 //    	return this.state.pictures;
 //    }

	showAlert() {
    this.msg.show('Please fill out all the fields', {
      time: 4000,
      type: 'info',
      transition: 'scale'
    })
  }

  render() {
    return (
    	<div>
	      <div className = 'diary' id = 'diary' style={{backgroundImage: this.state.theme}}>
	      	<div>
	      		<Toolbar id = 'toolbar' className = 'entry col-lg-2' change = {this.changeBackgroundTo}/>
	      	</div>
	      	<div className = 'entry col-lg-8 col-lg-offset-2'>
	      		<h2><span className = 'badg' contentEditable ='true' name = 'title' id = 'postTitle'></span></h2>
	      		<div style ={{marginBottom: '100px'}}>
	      			<p><span id = 'postText' className = 'bad' contentEditable ='true' name = 'post' onKeyPress = {this.matchYoutube}></span></p>
	      		</div>
	      	</div>
	      	<div>
	      	<Toolbarright id = 'toolbarRight' className = 'entry col-lg-2' save ={this.props.route.save} alert = {this.showAlert}/>
	      	</div>
	      </div>
	      <AlertContainer ref={a => this.msg = a} />
	    </div>
    );
  }
}

export default Entry;