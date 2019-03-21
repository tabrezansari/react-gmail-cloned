/*==========================================
; Title:  Side Navigation Component
; Author: Tabrez Ansari
; Date of Creation:   21 Feb 2019
;==========================================*/
import React, { Component } from 'react';
import '.././App.css';
import './sidebar.css';
import plus from './plus.png';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import Popup from './compose';
  import {withRouter } from 'react-router-dom';
  import avatar from './avatar.png';
  import Chat from './chat';

class Sidebar extends Component{

  constructor(props){
    super(props);
    this.state={
      ismore:0,
      showPopup: false,
      dochat:false
      
    };
    this.showhide = this.showhide.bind(this);
  
  }

  componentWillMount(){
    console.log("props data in sidebar is:",this.props.useronline);

}
  
    
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

    showhide(){
      console.log('hi');
      const {ismore}=this.state;
      if(ismore==1){
        this.setState({ismore:0});

      }else{
        this.setState({ismore:1});

      }
    }
    gotoinbox(){
      console.log("inbox got clicked by the user!!!");
      this.props.handleinboxfrompar();

    }
 
    openchat(){
      this.setState({dochat:true});
    }


  
  render(){
    return(
      <div class="sidebar">

        <button onClick={this.togglePopup.bind(this)} className="compose-button" style={{color:'grey'}}><img src={plus} className="plusicon" /> <span className="compose-span">Compose</span></button>
        
        <a href="" onClick={() =>this.gotoinbox()} style={{color:'#d93025'}} className="activebtn"><i class="fa fa-fw fa-inbox" style={{marginRight:'15px',color:'#d93025'}}></i> Inbox</a>
        <a href="#services"><i class="fa fa-fw fa-star" style={{marginRight:'15px'}}></i> Starred</a>
        <a href="#clients"><i class="fa fa-fw fa-clock" style={{marginRight:'15px'}}></i> Snoozed</a>
        <a href="#contact"><i class="fa fa-fw fa-location-arrow" style={{marginRight:'15px'}}></i> Sent</a>
        {this.state.ismore==1?
        <a href="#" onClick={this.showhide}><i class="fa fa-fw fa-angle-up" style={{marginRight:'15px'}}></i> Less </a>:
        <a href="#" onClick={this.showhide}><i class="fa fa-fw fa-angle-down" style={{marginRight:'15px'}}></i> More </a>}
        {this.state.ismore==1?<div id="more">
        <a href="#contact"><i class="fa fa-fw fa-file" style={{marginRight:'15px'}}></i> Drafts</a>
        <a href="#contact"><i class="fa fa-fw fa-comments" style={{marginRight:'15px'}}></i> Chats</a>
        <a href="#contact"><i class="fa fa-fw fa-exclamation-circle" style={{marginRight:'15px'}}></i> Spam</a>



     </div>:null}

          <div className="chatmenu">
          <img style={{width:'30px',marginTop:'-10px',float:'left'}} src={avatar}/>
          <span style={{float:'left',marginTop:'-2px',marginLeft:'10px',fontSize:'15px'}}>Tabrez <i class="fa fa-caret-down" style={{color:'gray'}}></i> </span> 
          <i class="fa fa-plus" style={{float:'right',color:'gray'}}></i>
          </div><br/>
          <div onClick={() =>this.openchat()} className="chatlist">
          <img style={{width:'30px',marginTop:'-10px',float:'left'}} src={avatar}/>
          <span style={{float:'left',marginTop:'-2px',marginLeft:'10px',fontSize:'15px'}}>Amit Yadav </span> 
          </div>
     
        {this.state.showPopup ? 
        <Popup
          text='Close Me'
          closePopup={this.togglePopup.bind(this)}
        />
        : null
      }

      
      {this.state.dochat ? 
        <Chat
          text='Close Me' useractive={this.props.useronline}
        />
        : null
      }

      <ToastContainer
position="bottom-left"
autoClose={4000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnVisibilityChange
draggable
pauseOnHover
/>

</div>

    );
  }
}



/**end of popup */


export default Sidebar;
