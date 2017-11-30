import React, { Component } from 'react';

class Toolbarright extends Component {

  render() {
    return (
   <div className="btn-group-vertical" id = {this.props.id}>
    <button type="button" className="btn btn-default">Save</button>
    <button type="button" className="btn btn-default">See old entries</button>
    <button type="button" className="btn btn-default">Upload Image</button>
    <button type="button" className="btn btn-default">Send</button>
    </div>
    );
  }
}

export default Toolbarright;