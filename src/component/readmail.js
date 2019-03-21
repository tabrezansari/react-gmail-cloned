/*==========================================
; Title: Email Reader Component
; Author: Tabrez Ansari
; Date of Creation:   23 Feb 2019
;==========================================*/
import React from 'react';
import './readmail.css';
import user from './user.png';
import { connect } from 'react-redux';
import Moment from 'react-moment';

class ReadMail extends React.Component {
 constructor(props){
super(props);
this.state={
    data:[{"id": 25, "type": 3, "from": "Hu", "subject": "Placerat Eget Venenatis Corp.", "content": "103-368 Vitae, Avenue", "date": "Oct 28, 2019", "isread": 1}]

};

 }

 
   
    render() {
 


       return (
         
    <div className="readm">
    <sub style={{marginLeft: '28px'}}>{this.props.email.subject}!</sub>
        <div className="eheader">
        <img src={user} className="eheader-prof"/>
        <span  class="username" >{this.props.email.s}</span><span class="user-email"><span aria-hidden="true">&lt;</span>{this.props.email.sender_mail}<span aria-hidden="true">&gt;</span></span>
    <span name="me"  class="tome" >to me <i class="fa fa-caret-down"></i></span>

    <span  class="edate"><Moment format="D MMM YYYY" withTitle>{this.props.email.date}</Moment> (<Moment fromNow>{this.props.email.date}</Moment>) <i class="far fa-star" style={{marginLeft:'10px',fontSize:'1rem'}}></i>  <i class="fas fa-reply" style={{marginLeft:'10px',fontSize:'1rem'}}></i>     <i class="fas fa-ellipsis-v" style={{marginLeft:'10px',fontSize:'1rem'}}></i> </span> 
        </div><br/>
        <msg className="msg">{this.props.email.content}.<br/><br/>
           </msg>
        <br/><br/>
           <div className="quote">
      On <Moment  titleFormat="D M Y" withTitle>{this.props.email.date}</Moment> {this.props.email.from}
       &lt;<a href="mailto:tabrezdaily007@gmail.com" target="_blank">{this.props.email.sender_mail}</a>&gt;

 
       wrote:
       </div>
        </div>
     
      
      
      
      
       );
    }
  }

  function mapStateToProps(state) {
    return{
    email: state.activeEmail,
    };
  }
  
  
  
  
  
  export default connect(mapStateToProps)(ReadMail);
