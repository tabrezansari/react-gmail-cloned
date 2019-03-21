import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './component/login';
import Register from './component/register';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

import { Provider } from 'react-redux';
// import { store } from './redux';
import allReducers from './reducers';
// Wrap existing app in Provider - Step 2
import {BrowserRouter as Router , Route,Switch} from 'react-router-dom';

import {createStore} from 'redux';
const store =createStore(allReducers);



ReactDOM.render(
  <Provider store={store}>  
  <Router>
    <Switch>
    <Route exact path="/" component={App} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />

    </Switch>
  </Router>
  </Provider>,
  document.getElementById('root')
);