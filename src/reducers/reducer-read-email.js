/*==========================================
; Title:  Read Email Reducer(Redux.js)
; Author: Tabrez Ansari
; Date of Creation:   23 Feb 2019
;==========================================*/

export default function (state=null,action){
    switch(action.type){
        case "SELECT_EMAIL":
        return action.payload;
        break;
    }
    return state;
}