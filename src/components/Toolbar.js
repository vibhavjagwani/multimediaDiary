import React, { Component } from 'react';

class Toolbar extends Component {

  render() {
    return (
   <div className="btn-group-vertical" id = {this.props.id}>
    <button type="button" className="btn btn-default">Change color</button>
    <button type="button" className="btn btn-default">Change theme</button>
    <button type="button" className="btn btn-default">Change font</button>
    <br /><br />
    <button type="button" className="btn btn-default">B</button>
    <button type="button" className="btn btn-default">U</button>
    <button type="button" className="btn btn-default">I</button>
    </div>
    );
  }
}

export default Toolbar;