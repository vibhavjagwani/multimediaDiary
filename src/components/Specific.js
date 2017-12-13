import React, { Component } from 'react';
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

 
//vulnerable to xxs, find better solution
  render() {
    if(this.state.entry !== null) {
      return (
      <div>
      <Nav/>
        <div className = {'diary'} style = {{backgroundImage:this.state.entry.background}}>
          <div className = 'entry col-lg-8 col-lg-offset-2'>
            <h2><span className = 'badg' name = 'title' id = 'postTitle'>{this.state.entry.title}</span></h2>
            <div>
              <p><span dangerouslySetInnerHTML = {{__html: '' + this.state.entry.text}}></span></p>
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
    return (<h1 style = {{float: 'left'}}> Post loading </h1>)
}
}

export default Specific;