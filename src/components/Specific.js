import React, { Component } from 'react';
import { base } from '../base';
import Nav from './Nav';
import {app} from '../base';
import {browserHistory} from 'react-router';

class Specific extends Component {

  constructor(props){
    super(props);
    this.state = {
      entries : [],
      loggedIn: false,
      entry : null
    }
    this.rendProper = this.rendProper.bind(this);
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

 

  rendProper(e) {
    var regyoutube = /(http(s)??\:\/\/)?(www\.)?((youtube\.com\/watch\?v=)|(youtu.be\/))([a-zA-Z0-9\-_])+$/;
    var str = e.toString();
    var x = str.search(regyoutube);
    var loop = true;
    while(loop) {
      if(x!== -1) {
        var y = str.match(regyoutube)[0].toString().replace("watch?v=","embed/");
        str = str.substring(0,x) + '<br/>' + '<iframe src="'+ y.toString() +'" width="560"'+ 
        'height="315" frameborder="0" allowfullscreen></iframe>' + '<br/>' +  str.substring(x+y.length+2,str.length);
        x = str.search(regyoutube);
      } else {
        return str;
      }
    }
  }

  render() {
    if(this.state.entry !== null) {
      return (
      <div>
      <Nav/>
        <div className = "diary">
          <div className = "entry col-lg-8 col-lg-offset-2">
            <h2 className = ""><span className = "badg" name = "title" id = "postTitle">{this.state.entry.title}</span></h2>
            <div>
              <p><span id = "postText" className = "bad" name = "post" onChange = {this.matchYoutube}>{this.state.entry.text}</span></p>
            </div>
          </div>
        </div>
      </div>
    )
    }
    const entry = this.props.params.entryId;
    var entries = (this.props.route.update());
    const ent = entries[entry];
    if (ent !== undefined){
      this.setState({entry:ent })
      console.log(ent.title.toString());
    }
    return (<h1 style = {{float: "left"}}> Song loading </h1>)
}
}

export default Specific;