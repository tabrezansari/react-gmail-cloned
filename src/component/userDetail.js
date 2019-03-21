import React from 'react';

import { connect } from 'react-redux';
// App.js

 class UserDetail extends React.Component {
  
  render() {
    if(!this.props.user){
      return(<h2>Select User....</h2>);
    }
    return (
      <div>
        <h4>{this.props.user.fname}</h4><br/>
        <h4>{this.props.user.lname}</h4><br/>
        <h4>{this.props.user.address}</h4>


      </div>
    );
  }
}

// AppContainer.js
function mapStateToProps(state) {
  return{
  user: state.activeUser,
  };
}





export default connect(mapStateToProps)(UserDetail);