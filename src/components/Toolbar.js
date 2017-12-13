import React, { Component } from 'react';
import Modal from 'react-modal';

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalTheme: false
    };
    this.toggleModalTheme = this.toggleModalTheme.bind(this);
  }

  toggleModalTheme() {
    this.setState({modalTheme:!this.state.modalTheme});
  }


  render() {
    return (
   <div className='btn-group-vertical' id = {this.props.id}>
    <button className='btn btn-default' onClick= {this.toggleModalTheme}>
      Change theme
    </button>
     <Modal
        isOpen={this.state.modalTheme}
        style={{textAlign:'center'}}
        ariaHideApp={false}
        aria={{
          labelledby: 'heading',
        }}>
        <h1 id='heading' style = {{textAlign:'center'}}>Themes</h1>
        <div className='row' style = {{width: '100%', display:'inline-block', textAlign:'center'}}>
        <ul className='list-inline'>
         <li> <div id='col-lg-2' style ={{width: '33%', padding:'20px'}}>
         <img src='../images/yellowpaper.png' style={{maxWidth: '200px'}} alt = '' onClick ={()=>{
          this.props.change('url(../images/yellowpaper.png)');
          this.toggleModalTheme();
         }}/>
          </div> </li>
         <li> <div id='col-lg-2' style ={{width: '33%', padding:'20px'}}>
           <img src='../images/paperTexture.jpg' style={{maxWidth: '200px'}} alt = '' onClick ={()=>{
          this.props.change('url(../images/paperTexture.jpg)');
          this.toggleModalTheme();
         }}/>
          </div></li>
        </ul>
        <button onClick= {this.toggleModalTheme} className='btn btn-primary' style ={{justifyContent:'middle'}}>Close</button>
        </div>
      </Modal>
    </div>
    );
  }
}

export default Toolbar;