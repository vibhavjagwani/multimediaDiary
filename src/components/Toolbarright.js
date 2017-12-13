import React, { Component } from 'react';
import { Link } from 'react-router';

class Toolbarright extends Component {
  render() {
    return (
   <div className='btn-group-vertical' id = {this.props.id}>
    <button type='button' className='btn btn-default' onClick={()=> {
      if(document.getElementById('postTitle').innerHTML === '' || 
        document.getElementById('postText').innerHTML === '') {
        this.props.alert();
      } else {
        this.props.save();
      }
    }}>Save</button>
    <Link className = 'btn btn-default' to = '/entries'>Go back</Link>
    </div>
    );
  }
}

export default Toolbarright;