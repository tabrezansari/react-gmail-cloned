/*==========================================
; Title:  Main Component
; Author: Tabrez Ansari
; Date of Creation:   21 Feb 2019
;==========================================*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './component/main';
import Header from './component/header';
import Sidebar from './component/sidebar';
import {withRouter } from 'react-router-dom';
import io from "socket.io-client";

import ReadMail from './component/readmail';
import { connect } from 'react-redux';

class App extends Component {
 constructor(props){
  super(props);

   this.state={
    read:0,
    maildata:null,
    isonline:1
   }
   

  this.handleData = this.handleData.bind(this);
  this.handleinbox = this.handleinbox.bind(this);

  this.socket = io('localhost:5000');
  var jwt_decode  = require('jwt-decode');

  var tokendata=localStorage.getItem("token");
 if(tokendata!=null){
  var decoded = jwt_decode(tokendata);
  console.log(decoded.result[0].email);
    this.socket.emit('addusers',decoded.result[0].email);
 }


  this.socket.on('userlist', function(data){
  console.log(data)
  data.forEach(users => {
    if(users.user=='abc@abc.com'){
      console.log("he is online");
      this.setState({isonline:1});
      console.log("data is:"+this.state.isonline);
    }else{
      console.log("he is ofline");
      this.setState({isonline:0});


    }
  });

});

}


// Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
componentWillMount(){
  var isloggedin=localStorage.getItem("token");

  if(isloggedin==null){
    this.props.history.push('/login');
  }
}

  handleData(data) {
    console.log("handling parent here!!")
    const {maildata}=this.state;
    console.log("data is :"+data)
    this.setState({
      maildata: data
    });

  }
 
  handleinbox() {
    console.log("this got called");
    this.props.history.push('/');


  }
  change(){
    this.setState({
      read: 0
    }); 
    console.log("this data is received from the user =",this.state.read);
  }

  
  triggerChildPaginate(){
    console.log("calling child");
    console.log(this.refs.childref)
    this.refs.childref.emailPaginate();
   }
 
   triggerChildPaginate2(){
    console.log("calling child");
    console.log(this.refs.childref)
    this.refs.childref.emailPaginateBack();
   }
 

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Header/>
        </div>
        {/* mailiddata={this.state.maildata} */ }
       
          <Sidebar handleinboxfrompar={this.handleinbox} useronline={this.state.isonline}/>
          
          <div className="maincontrol" >
          <div className="controlitem" style={{color:'#767676'}}>
          <i class="far fa-square" aria-hidden="true"></i> <i class="fa fa-caret-down" aria-hidden="true"></i>
          <i class="fa fa-refresh" aria-hidden="true"></i>
          <i style={{marginRight:'55px',float:'right'}}   class="fa fa-cog" aria-hidden="true"></i>
           <i style={{marginRight:'55px',float:'right',cursor: 'pointer'}} onClick={this.triggerChildPaginate.bind(this)} class="fa fa-angle-right" aria-hidden="true"></i><i style={{marginRight:'40px',float:'right',cursor:'pointer'}} onClick={this.triggerChildPaginate2.bind(this)} class="fa fa-angle-left"></i>
           <span style={{float:'right',marginRight:'20px',fontSize:'12px',marginTop:'2px'}}>Page 1 - 10</span>


          </div>    
          </div>
          {this.props.email==null?<div class="main">
          <Main ref="childref"  handlerFromParant={this.handleData}/>
          </div>:<div class="main2">
          <ReadMail mailiddata={this.state.maildata}/>
          </div>}

        </div>

        );
    }
}

  /*Statring of Popup */
  function mapStateToProps(state) {
    return{
    email: state.activeEmail,
    };
  }

export default connect(mapStateToProps)(App);
