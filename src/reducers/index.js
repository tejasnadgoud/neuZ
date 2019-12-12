//  const initialState = {
//     auth : {user_name:'anwesh'}
//  }

// export default ( state = initialState , action ) => {
// //function LoginStateReducer ( state , action ) {
//     switch ( action.type) {
//         case 'USER_LOGIN':
//             console.log('user login');
//             return Object.assign({},state, {auth: action.payload})
//         // case 'USER_LOGOUT' :
//         //     console.log('user.logout');
//         //     return Object.assign({},state, {authenticate : false}) 
//         default:
//             return state
//     }
// }

// // export default ( state = initialState , action ) => {
// //     LoginStateReducer(state,action);
// // }
import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert
});

export default rootReducer;