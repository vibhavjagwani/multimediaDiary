import React, { Component } from 'react';
import { base } from '../base';
import Nav from './Nav';
import {app} from '../base';
import {browserHistory, Link} from 'react-router';

class Entries extends Component {

	constructor(props){
		super(props);
		this.state = {
			entries:[],
			loggedIn: false
		}
		this.sortTime = this.sortTime.bind(this);
	}
	componentWillMount() {
		this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({
          loggedIn: true
        });
        this.entriesRef = base.syncState('entries/'+ user.uid, {
			context: this,
			state: 'entries'
		});
      } else {
        this.setState({
          loggedIn: false
        });
        browserHistory.push('/');
        base.removeBinding(this.entriesRef);
      }
    })	
	}

	componentWillUnmount() {
		this.removeAuthListener();
		base.removeBinding(this.entriesRef);
	}

	sortTime(a,b) {
		return (this.state.entries[b]).time - (this.state.entries[a]).time
	}
 
  render() {
  	const entryIds = Object.keys(this.state.entries);
  	entryIds.sort(this.sortTime);
	const entries = this.state.entries;
    return (
	    <div>
	    <Nav loggedIn = {this.state.loggedIn}/>
	    <div>
	    <h1> Posts</h1>
	     {
	     	entryIds.map((id) => {
	     		if((entries[id].title).length > 13) {
	     			var title = (entries[id].title).substring(0,13) + '...'
	     		} else {
	     			var title = entries[id].title
	     		}
				return(
					<div key={id} className = 'col-lg-3' style ={{}}>
					<div className ='col-lg-10'>
					<div className = 'col-lg-12' style={{borderRadius: '5px', padding: '30px', width:'100%',  backgroundColor: '#d5e4ff', marginTop: '40px', marginBottom: '10px'}}>
							<Link to = {'/specific/' + entries[id].id}>
							<div style = {{margin:'2px'}}> 
								<h3 style ={{color:'black'}}>{entries[id].date} </h3>
							</div>
							<div>
								<h4>{title}</h4> 
							</div>
							</Link>
						<button className = 'btn btn-danger btn-block' onClick = {() => {
							this.props.route.del(entries,id);
							this.setState({entries: {[id]: null}});
							this.forceUpdate();
						}}>Delete</button>
					</div>
					</div>
					</div>
				)
			})

	     }
	     </div>
	    </div>
    );
  }
}

export default Entries;