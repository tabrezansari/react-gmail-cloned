import React from 'react';
import './login.css';
import google from './goo.png';
import {withRouter } from 'react-router-dom';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
class Login extends React.Component {
constructor(props){
    super(props);
    this.state={
        email:'',
        password:'',
        show:false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleemail = this.handleemail.bind(this);
    this.handlepassword = this.handlepassword.bind(this);

}
componentWillMount(){
  var isloggedin=localStorage.getItem("token");
  if(isloggedin!=null){
    this.props.history.push('/');
  }
}
handleemail(event){
    this.setState({email : event.target.value})
    }
 handlepassword(event){
        this.setState({password : event.target.value})
        }
    
handleSubmit(event) {
    event.preventDefault();

         fetch('/login',{
          method: 'POST',
          body: JSON.stringify({
          email: this.state.email,
          password:this.state.password
          }),
          headers: {"Content-Type": "application/json"}
        })
        .then(function(response){
          return response.json()
        }).then((body) =>{
          console.log(body)
          if(body.token==undefined){
            this.setState({show:true});

                    console.log("Authentication failed!!!");
                  }else{
                    localStorage.setItem("token",body.token);
                    this.props.history.push('/');
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
         <label className="mainlabel">Sign in</label><br/>
         <p className="mainlabel2">with your Google Account</p><br/>
         <form onSubmit={this.handleSubmit}>
         <input type="email" className="loginemail" onChange={this.handleemail} name="email" placeholder="Email or Phone" required /><br/>
         <input type="password" className="loginemail" name="password" onChange={this.handlepassword} placeholder="Password" required /><br/>
         <div className="loginaccess">
            <input type="button" className="loginspan" onClick={()=>this.redirect('/register')} value="Create account" />
            <input type="submit" className="loginbtn" value="Sign in" />

         </div>
         </form>
         </div>

         
         <SweetAlert
        show={this.state.show}
        title="Authentication Failed!!"
        text="wrong credentials provided.try again!"
        onConfirm={() => this.setState({ show: false })}
      />
         </div>
        
     
       );
    }
  }

export default Login;