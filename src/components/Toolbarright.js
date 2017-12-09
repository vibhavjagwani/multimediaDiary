import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

class Toolbarright extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
   <div className="btn-group-vertical" id = {this.props.id}>
    <button type="button" className="btn btn-default" onClick={this.props.save}>Save</button>
    <Link className = "btn btn-default" to = "/entries"> See old entries</Link>
    <button type="button" className="btn btn-default">Upload Image</button>
    <button type="button" className="btn btn-default">Send</button>
    </div>
    );
  }
}

export default Toolbarright;