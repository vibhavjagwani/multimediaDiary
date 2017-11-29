import React, { Component } from 'react';

class Button extends Component {

  render() {
    return (
      <div>
      	<button className="btn btn-success" onClick = {this.props.action} style = {{display: this.props.stile}}>{this.props.name}</button>
      </div>
    );
  }
}

export default Button;
