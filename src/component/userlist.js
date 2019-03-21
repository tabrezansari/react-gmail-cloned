import React from 'react';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectUser}  from '../action/index';
// App.js
 class Userlist extends React.Component {
  createlistitems(){
    return this.props.users.map((users)=>{
      return(
        <li key={users.id}
        onClick={()=>this.props.selectUser(users)}>{users.fname}</li>
      );
    });
  }
  render() {
    return (
      <div>
       <ul>
        {this.createlistitems()}


         </ul>
         
      </div>
    );
  }
}

// AppContainer.js
function mapStateToProps(state) {
  return{
  users: state.users,
  };
}


function mapDispatchToProps(dispatch){
  return bindActionCreators({selectUser:selectUser},dispatch)
}



export default connect(mapStateToProps,mapDispatchToProps)(Userlist);