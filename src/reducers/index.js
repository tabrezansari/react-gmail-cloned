/*==========================================
; Title:   Reducer Combiner(Redux.js)
; Author: Tabrez Ansari
; Date of Creation:   23 Feb 2019
;==========================================*/
import {combineReducers} from 'redux';
import emailReducer from './reducer-emails';
import ActiveEmailReducer from './reducer-read-email';
const allReducers=combineReducers({
    emails:emailReducer,
    activeEmail:ActiveEmailReducer

});

export default allReducers;