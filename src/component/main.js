/*==========================================
; Title:  Main containter
; Author: Tabrez Ansari
; Date of Creation:   21 Feb 2019
;==========================================*/


import React from 'react';
import './main.css';
import Moment from 'react-moment';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectEmail}  from '../action/index';

class Main extends React.Component {
 constructor(props){
    super(props);
    this.state={
        mailid:0,   
        pmails:null,
        ppmails:null,
        smails:null,
        page:1,
        mailtype:1


      };
      this.handletab = this.handletab.bind(this);

 }

    readmail(mail){
     this.props.handlerFromParant(mail);
    }

    componentWillMount(){
      console.log("calling here!!!");
      var obj={
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
        }
      };
      
      fetch('/getmails/1/1', obj)  
  .then(function(res) {
    return res.json();
   })
   .then((resJson)=> {
     this.setState({pmails:resJson.rows});
      // console.log(resJson);
   });
   fetch('/getmails/1/2', obj)  
   .then(function(res) {
     return res.json();
    })
    .then((resJson)=> {
      this.setState({smails:resJson.rows});
       // console.log(resJson);
    });
      fetch('/getmails/1/3', obj)  
  .then(function(res) {
    return res.json();
   })
   .then((resJson)=> {
     this.setState({ppmails:resJson.rows});
      // console.log(resJson);
   });


   
  }

  emailPaginate=()=>{

    var obj={
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
      }
    };
    var newpage=this.state.page+1;
    console.log('/getmails/'+newpage+'/'+this.state.mailtype);
    
    console.log("calling page no:"+newpage);
    fetch('/getmails/'+newpage+'/'+this.state.mailtype, obj)  

.then(function(res) {
  return res.json();
 })
 .then((resJson)=> {
console.log(resJson);
if(resJson.rows.length!=0){
  if(this.state.mailtype==1){
    this.setState({pmails:resJson.rows});

  } else if(this.state.mailtype==2){
    this.setState({smails:resJson.rows});

  }else{
    this.setState({ppmails:resJson.rows});

  }
  this.setState({page:newpage});
}
   

 });


  }
  handletab(e){
    console.log(e.target.value);
window.selectonlytab(e.target.id);
this.setState({mailtype:e.target.value});
this.setState({page:1});
  }

  emailPaginateBack=()=>{

    var obj={
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
      }
    };
    var newpage=this.state.page-1;
    console.log("calling page no:"+newpage);

    fetch('/getmails/'+newpage+'/'+this.state.mailtype, obj)  
.then(function(res) {
  return res.json();
 })
 .then((resJson)=> {
console.log(resJson);
if(this.state.mailtype==1){
  this.setState({pmails:resJson.rows});

} else if(this.state.mailtype==2){
  this.setState({smails:resJson.rows});

}else{
  this.setState({ppmails:resJson.rows});

}
   this.setState({page:newpage});

 });


  }

    
    render() {
      


        
let pdata = this.props.emails.filter(data => data.type==1);
let sdata = this.props.emails.filter(data => data.type==2);
let ppdata = this.props.emails.filter(data => data.type==3);
let pemails=null;
let semails=null;
let ppemails=null;
       
if(this.state.pmails!=null){
              
  pemails=this.state.pmails.map((email, index) =>  {
    
      return (       
        <tr onClick={() =>this.props.selectEmail(email)}>
        <td><i class="far fa-square"></i> <i class="far fa-star"></i></td>
        {email.isread==1?<td style={{fontWeight:'normal'}}>{email.sender_mail}</td>:<td style={{fontWeight:'bold'}}>{email.sender_mail}</td>}
        <td>{email.isread==1?<sub  className="sub" style={{fontWeight:'normal'}}>{email.subject}</sub>:<b>{email.subject}</b>} - <small style={{color:'gray'}}>{email.content}</small>.  </td>
        <td>{email.isread==1?<sub  className="sub" style={{fontWeight:'normal'}}><Moment  format="MMM D" withTitle>{email.date}</Moment></sub>:<b><Moment  format="MMM D" withTitle>{email.date}</Moment></b>} </td>
        </tr>
     )
    });
  }
  if(this.state.smails!=null){
 semails =this.state.smails.map((email, index) =>  {return (       
        <tr onClick={() =>this.props.selectEmail(email)}>
        <td><i class="far fa-square"></i> <i class="far fa-star"></i></td>
        {email.isread==1?<td style={{fontWeight:'normal'}}>{email.sender_mail}</td>:<td style={{fontWeight:'bold'}}>{email.sender_mail}</td>}
        <td> {email.isread==1?<sub  className="sub" style={{fontWeight:'normal'}}>{email.subject}</sub>:<b>{email.subject}</b>} - <small style={{color:'gray'}}>{email.content}</small>.  </td>
        <td>{email.isread==1?<sub  className="sub" style={{fontWeight:'normal'}}><Moment  format="MMM D" withTitle>{email.date}</Moment></sub>:<b><Moment  format="MMM D" withTitle>{email.date}</Moment></b>} </td>
        </tr>
        )
    });
  }
  if(this.state.ppmails!=null){
     ppemails =this.state.ppmails.map((email, index) =>  {return (       
            <tr onClick={() =>this.readmail(email)}>
            <td><i class="far fa-square"></i> <i class="far fa-star"></i></td>
            {email.isread==1?<td style={{fontWeight:'normal'}}>{email.sender_mail}</td>:<td style={{fontWeight:'bold'}}>{email.sender_mail}</td>}
            <td>{email.isread==1?<sub  className="sub" style={{fontWeight:'normal'}}>{email.subject}</sub>:<b>{email.subject}</b>} - <small style={{color:'gray'}}>{email.content}</small>.  </td>
            <td>{email.isread==1?<sub  className="sub" style={{fontWeight:'normal'}}><Moment  format="MMM D" withTitle>{email.date}</Moment></sub>:<b><Moment  format="MMM D" withTitle>{email.date}</Moment></b>} </td>
            </tr>
            )
        });
      }
       return (
           
         
        <div>
<input id="tab1" type="checkbox" value="1" onClick={this.handletab} name="tabs"  />
		  <label for="tab1" ><i class="fa fa-inbox"></i> Primary</label>
	
		  <input id="tab2" type="checkbox" value="2" onClick={this.handletab} name="tabs"/>
		  <label for="tab2"><i class="fa fa-user-friends"></i> Social</label>
	
		  <input id="tab3" type="checkbox" value="3" onClick={this.handletab} name="tabs"/>
		  <label for="tab3"><i class="fa fa-tag"></i>  Promotions</label>
	
        <hr style={{marginTop:'0px'}}/>
		  <div class="content">  
                <div id="content1">
                <table>
                {pemails}

                </table>
                </div>
	

                <div id="content2">
                <table>
                {semails}



                </table>
                </div>


                <div id="content3">
                <table>
                {ppemails}



                </table>
                </div>

			
		      </div>
	
	
            </div>
      
     
      
      
      
       );
    }
  }

  function mapStateToProps(state) {
    return{
    emails: state.emails,
    };
  }
  
  
  function mapDispatchToProps(dispatch){
    return bindActionCreators({selectEmail:selectEmail},dispatch)
  }
  
  
  
  
  export default connect(mapStateToProps,mapDispatchToProps,null,{forwardRef:true})(Main);