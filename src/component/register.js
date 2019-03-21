import React from 'react';
import './register.css';
import google from './goo.png';
import {withRouter } from 'react-router-dom';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
class Register extends React.Component {
constructor(props){
    super(props);
    this.state={
        email:'',
        password:'',
        fname:'',
        lname:'',
        show:false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleemail = this.handleemail.bind(this);
    this.handlepassword = this.handlepassword.bind(this);
    this.handlefname = this.handlefname.bind(this);
    this.handlelname = this.handlelname.bind(this);
}

            handleemail(event){
            this.setState({email : event.target.value})
            }
            handlepassword(event){
            this.setState({password : event.target.value})
            }
            handlefname(event){
            this.setState({fname : event.target.value})
            }
            handlelname(event){
            this.setState({lname : event.target.value})
            }
            
    closemsg(){
        this.setState({show:false});
    }

handleSubmit(event) {
    event.preventDefault(); 
    fetch('/register',{
        method: 'POST',
        body: JSON.stringify({
        email: this.state.email,
        fname:this.state.fname,
        lname:this.state.lname,
        password:this.state.password,
       
        }),
        headers: {"Content-Type": "application/json"}
      })
      .then(function(response){
        return response.json()
      }).then((body) =>{
        console.log(body)
        if(body.created==0){

                  console.log("Authentication failed!!!");
                }else{
                    // this.setState({show:true});

                    this.props.history.push('/login');
                }
      });

      
  }

  redirect(route){
    this.props.history.push(route);
  }
    render() {
       return (
         <div className="logincont">
         <div className="loginbox">
         <img className="logingmail" src={google} /><br/>
         <label className="mainlabel">Sign up</label><br/>
         <p className="mainlabel2">to get access to gmail!</p><br/>
         <form onSubmit={this.handleSubmit}>
         <div>
         <input type="text" className="loginemail" style={{width:'48%',float:'left'}} onChange={this.handlefname} placeholder="First Name" required />
         <input type="text" className="loginemail" style={{width:'48%',float:'right'}} onChange={this.handlelname} placeholder="Last Name" required /><br/>

         </div>
         <input type="email" className="loginemail" onChange={this.handleemail} placeholder="Email or Phone"  required/><br/>
         <input type="password" className="loginemail" onChange={this.handlepassword} placeholder="Password" required /><br/>
         <div className="loginaccess">
            <input type="button" className="loginspan" onClick={()=>this.redirect('/login')} value="Have an account?" />
            <input type="submit" className="loginbtn" value="Sign up" />

         </div>
         </form>
         <SweetAlert success 
        show={this.state.show}
        title="Kudos!"
        text="Account created successfully!!!"
      />
         </div>

         
           
         </div>
        
     
       );
    }
  }

export default Register;