import { userConstants } from "../constants";
import loginuser from "../services/LoginService";
import logoutuser from "../services/LogoutService";
import { loginService } from "../services/LoginService";
import { userService } from "../services/UserService";
import { alertActions } from "./";
import { history } from "../helpers/history";
import Search from "../Search";
import React, { Component } from "react";

export const userActions = {
  login,
  logout,
  update
  // register,
  //getAll,
  // delete: _delete
};

function login(user_name, password) {
  //console.log(data);
  return dispatch => {
    dispatch(request({ user_name }));
    //loginuser(user_name,password) //await
    //return loginResult
    loginService.login(user_name, password).then(
      res => {
        if (res === 200) {
          localStorage.setItem("user", user_name);
          dispatch(success(user_name));
          history.push("/AllChannel");
          window.location.reload(true);
        } else {
          const err = "Username and/or Password incorrect";
          dispatch(failure(err));
          dispatch(alertActions.error(err));
        }
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  // return dispatch => {
  logoutuser();
  history.push("/");
  window.location.reload(true);
  return { type: userConstants.LOGOUT };
  // logoutuser()
  // .then(
  //     () => {
  //         dispatch(logout_request());
  //         history.push('/');
  //     }
  // );
  // }
  //function logout_request() { return { type: userConstants.LOGOUT } }
}

// function register(user) {
//     return dispatch => {
//         dispatch(request(user));

//         userService.register(user)
//             .then(
//                 user => {
//                     dispatch(success());
//                     history.push('/login');
//                     dispatch(alertActions.success('Registration successful'));
//                 },
//                 error => {
//                     dispatch(failure(error.toString()));
//                     dispatch(alertActions.error(error.toString()));
//                 }
//             );
//     };

//     function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
//     function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
//     function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
// }

function getAll() {
  return dispatch => {
    dispatch(request());

    userService.getAll().then(
      users => dispatch(success(users)),
      error => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     return dispatch => {
//         dispatch(request(id));

//         userService.delete(id)
//             .then(
//                 user => dispatch(success(id)),
//                 error => dispatch(failure(id, error.toString()))
//             );
//     };

//     function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
//     function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
//     function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
// }

function update(id, first_name, last_name, email, phoneNumber, password) {
  //console.log(data);
  return dispatch => {
    dispatch(request({ id }));
    //loginuser(user_name,password) //await
    //return loginResult
    userService
      .update(id, first_name, last_name, email, phoneNumber, password)
      .then(
        res => {
          if (res === 200) {
            dispatch(success(id));
          } else {
            const err = "Username and/or Password incorrect";
            dispatch(failure(err));
            dispatch(alertActions.error(err));
          }
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(userid) {
    return { type: userConstants.USER_UPDATE_REQUEST, userid };
  }
  function success(userid) {
    return { type: userConstants.USER_UPDATE_SUCCESS, userid };
  }
  function failure(userid) {
    return { type: userConstants.USER_UPDATE_FAILURE, userid };
  }
}
