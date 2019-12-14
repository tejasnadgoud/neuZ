//import config from 'config';
import { authHeader } from "../helpers/auth-header";

export const userService = {
  getAll,
  getById,
  update,
  updatepayment
};

const apiUrl = "http://localhost:4000";

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        //logout();
        //location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${apiUrl}/GetUserByUserName`, requestOptions).then(
    handleResponse
  );
}

function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function update(id, first_name, last_name, email, phoneNumber, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      first_name,
      last_name,
      email,
      phoneNumber,
      password
    })
  };

  return (
    fetch(`http://localhost:4000/registration/updateUser`, requestOptions)
      //.then(handleResponse)
      .then(res => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.status;
      })
  );
}

function updatepayment(id, donationAmount) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      donationAmount
    })
  };

  return (
    fetch(
      `http://localhost:4000/registration/updatedonationamount`,
      requestOptions
    )
      //.then(handleResponse)
      .then(res => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.status;
      })
  );
}
