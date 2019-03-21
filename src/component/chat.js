import React from 'react';
import '.././App.css';
import io from "socket.io-client";

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
class Chat extends React.Component {
    
    constructor(props){
      super(props);
      this.state={
        showPopup: false,
        msg:'',
        author:'',
        messages: []

      }
      this.socket = io('localhost:5000');
     


    this.socket.on('RECEIVE_MESSAGE', function(data){
            console.log("Received msg is:",data);
            addMessage(data);

    });
    const addMessage = data => {
        console.log(data);
        this.setState({messages: [...this.state.messages, data]});
        console.log(this.state.messages);
    };

   
    }

    
    componentWillMount(){
        var jwt_decode  = require('jwt-decode');

        console.log("props data in chat is:",this.props.useractive);
        
        var tokendata=localStorage.getItem("token");
           
        var decoded = jwt_decode(tokendata);
        console.log("author in the clinet side is :",decoded.result[0].email);
        this.setState({author:decoded.result[0].email});

    }
      
  
  
     
       
        closecompose(e){
            this.props.closePopup();
        }
  
        sendMessage(){
            var jwt_decode  = require('jwt-decode');

            var tokendata=localStorage.getItem("token");
           
          var decoded = jwt_decode(tokendata);
          console.log("author is :",decoded.result[0].email);
           console.log("Message is:"+this.state.msg) ;
            this.socket.emit('SEND_MESSAGE', {
                author: decoded.result[0].email,
                message: this.state.msg
            })
            this.setState({msg: ''});
        }
     
    render() {
      return (
        <div className='popup2'>
          <div className='popup_inner2'>
          <div className="popup-header2">
          
            <h5 style={{color:'white',marginTop:'0',padding:'10px',width:'50%'}}>Amit Yadav<br/>
            {this.props.useractive?<small><i style={{color:'green'}} class="fa fa-circle"></i> online</small>:<small><i style={{color:'white'}} class="fa fa-circle"></i> ofline</small>} </h5>
            
            <i onClick={this.props.closePopup} style={{float:'right',marginRight:'12px',marginTop:'-54px',color:'white'}} class="fa fa-times"></i>
              <div>
{this.state.messages.map(message => {
    return (
        <div className="msg-area">

{message.author==this.state.author?<div><div className="msg-right">
{message.message}
</div><br/><br/></div>
:<div><div className="msg-left">
{message.message}
</div>
<br/><br/></div>}
<br/>

    </div>
    )
})}
    

    </div>

  
  <input type="text"  className="popup-input2" id="fname" name="fname" value= {this.state.msg}  onChange={event => {this.setState({msg: event.target.value})}}
    onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.sendMessage()
                }
              }} placeholder="Send Message..."/>

  

  
            </div>

          </div>
        </div>
      );
    }
  }

export default Chat;