import React from 'react';
import './header.css';
import gmail from './logo.png';
import avatar from './avatar.png';
import bell from './bell.png';
import more from './more.png';
import user from './user.png';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectEmail}  from '../action/index';
import {withRouter } from 'react-router-dom';

class Header extends React.Component {
  constructor(props){
     super(props);
     this.state={
     keyword:'',
     searchemail:null
     }
  }

  logout(){
    localStorage.clear();
    this.props.history.push('/');
  }

 
    getresult(value){

    

      // return (
      //   datas.filter(data => data.subject.toLowerCase().includes(value.toLowerCase()))
      // );
      

    }
    handleChange (e) {
      this.setState({keyword: e.target.value});
      // const allemail=this.props.emails;
     
      fetch('/searchmail',{
        method: 'POST',
        body: JSON.stringify({
        keyword:e.target.value,
        }),
        headers: {"Content-Type": "application/json"}
      })
      .then(function(response){
        return response.json()
      }).then((body) =>{
        console.log(body.rows)
        this.setState({searchemail:body.rows});    

      });

  }

  showresult(){
    const {searchemail}=this.state;
    if(searchemail==null){
     return (null);
    }
    else{
   return searchemail.map((data) =>  {      
    return(
        <li onClick={()=> this.props.selectEmail(data)} key={data.id} className="result-items">
        <i style={{marginLeft:'18px',marginTop:'16px',marginRight:'16px',color:'gray'}} class="fa fa-envelope"></i>
        <div className="result-sub">{data.subject}!</div>
        <div  className="result-date">{data.date}</div>
        <br/>
        <div  className="result-name">{data.sender_mail}</div>

        </li>
    )
  });
}
  }

    render() {
       return (
         
      <div class="topnav">
<i class="fa fa-bars" aria-hidden="true" style={{color:'gray',float:'left',marginLeft:'35px',marginRight:'-35px',marginTop:'23px',fontSize:'19px'}}></i>

        <img className="topnav-logo" src={gmail} style={{marginTop:'13px',marginLeft:'-15px'}}/>


        <div class="search-container" >

        <button  id="searchbtn" className="search-button"><i class="fa fa-search"></i></button>
        <input id="search-input" type="text" className="topnav-input-field"  onChange={this.handleChange.bind(this)} placeholder="Search mail" name="search"/>
        <div className="search-data" id="searchcontent">
        <ul style={{listStyle:'none',marginTop:'0px'}}>
      
          {this.showresult()}     
            </ul>
          </div>
          <img className="topnav-profile"  src={avatar} style={{width:'34px',marginTop:'14px',marginRight:'20px'}}/>


          <img className="topnav-profile" src={bell} style={{width:'20px',marginTop:'20px',marginRight:'20px'}}/>
          <i onClick={this.logout} class="fa fa-bell"  style={{color:'gray',fontSize:'1.3em',marginTop:'20px',marginRight:'20px',float:'right'}}></i>

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
  
  export default connect(mapStateToProps,mapDispatchToProps)(Header);