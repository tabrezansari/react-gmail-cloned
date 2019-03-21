import React from 'react';
import '.././App.css';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
class Popup extends React.Component {
    constructor(props){
      super(props);
      this.state={
        showPopup: false,
        subject:'',
        content:'',
        rmail:'',
      };
      
      this.handlecontent = this.handlecontent.bind(this);
      this.handlermail = this.handlermail.bind(this);
      this.handlesubject = this.handlesubject.bind(this);
      this.closecompose=this.closecompose.bind(this)
      this.push_mail=this.push_mail.bind(this);
    }
      
  
  
      handlermail(event){
        this.setState({rmail : event.target.value})
        }
        handlesubject(event){
        this.setState({subject : event.target.value})
        }
        handlecontent(event){
        this.setState({content : event.target.value})
        }
       
        closecompose(e){
            this.props.closePopup();
        }
  
      push_mail(event){
          
        event.preventDefault(); 
      
          this.props.closePopup();
          const tok=localStorage.getItem("token");
          console.log(tok);
        fetch('/send_mail',{
          method: 'POST',
          body: JSON.stringify({
          r_mail:this.state.rmail,
          subject:this.state.subject,
          content:this.state.content,
          token:tok
         
          }),
          headers: {"Content-Type": "application/json"}
        })
        .then(function(response){
          return response.json()
        }).then((body) =>{
          console.log(body)
          if(body.created==0){
  
                    console.log("Sending failed!!!");
                  }else{
                    toast.success('Sent!', {
                        position: "bottom-left",
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                        });
                    
                  }
        });
  
      }
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
          <div className="popup-header">
            <h4 style={{color:'white',marginTop:'0',padding:'15px',width:'50%'}}>New Message</h4>
            <i onClick={this.props.closePopup} style={{float:'right',marginRight:'12px',marginTop:'-54px',color:'white'}} class="fa fa-times"></i>
  
            <form style={{marginTop:'-24px'}} onSubmit={this.push_mail}>
    <input type="text"  className="popup-input" onChange={this.handlermail} id="fname" name="fname" placeholder="Recipients"/>
    <input type="text" className="popup-input" id="lname" onChange={this.handlesubject} name="lname" placeholder="Subject"/><br/>
    <textarea  className="popup-textarea" onChange={this.handlecontent} cols="2" rows="10" />
    <div className="controller">
    <i class="fa fa-undo" style={{marginLeft:'12px',color:'gray',fontSize:'14px'}}></i>
    <i class="fa fa-redo" style={{marginLeft:'12px',color:'gray',fontSize:'14px'}}></i>
    <i class="fa fa-bold" style={{marginLeft:'25px',color:'gray',fontSize:'14px'}}></i>
    <i class="fa fa-italic" style={{marginLeft:'20px',color:'gray',fontSize:'14px'}}></i>
    <i class="fa fa-underline" style={{marginLeft:'20px',color:'gray',fontSize:'14px'}}></i>
    <i class="fa fa-palette" style={{marginLeft:'20px',color:'gray',fontSize:'14px'}}></i>
    <i class="fa fa-align-left" style={{marginLeft:'20px',color:'gray',fontSize:'14px'}}></i>
  
    <i class="fa fa-align-right" style={{marginLeft:'20px',color:'gray',fontSize:'14px'}}></i>
  
    <i class="fa fa-align-center" style={{marginLeft:'20px',color:'gray',fontSize:'14px'}}></i>
    <i class="fa fa-list-ol" style={{marginLeft:'20px',color:'gray',fontSize:'14px'}}></i>
  
  
    </div>
  
  
  
    <button className="popup-button" >Send</button>
    <i class="fa fa-font" style={{marginLeft:'12px',color:'gray',fontSize:'18px'}}></i>
    <i class="fa fa-paperclip" style={{marginLeft:'12px',color:'gray',fontSize:'18px'}}></i>
    <i class="fa fa-link" style={{marginLeft:'12px',color:'gray',fontSize:'18px'}}></i>
    <i class="fa fa-smile-wink" style={{marginLeft:'12px',color:'gray',fontSize:'18px'}}></i>
    <i class="fab fa-google-drive" style={{marginLeft:'12px',color:'gray',fontSize:'18px'}}></i>
  
    <i class="fa fa-image" style={{marginLeft:'12px',color:'gray',fontSize:'18px'}}></i>
  
        </form>
            </div>
          </div>
        </div>
      );
    }
  }

export default Popup;