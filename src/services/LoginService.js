export const loginService = {
  login,
  GetUsers
};

function login(user_name, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_name, password })
  };

  return (
    fetch(`http://localhost:4000/registration/login`, requestOptions)
      //.then(handleResponse)
      .then(res => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes

        return res.status;
      })
  );
}

function GetUsers(user_name) {
  //  const requestOptions = {
  //      method: 'POST',
  //      headers: { 'Content-Type': 'application/json' },
  //      body: JSON.stringify({user_name})
  //  };

  return fetch(`http://localhost:4000/registration/getUserByUserName`).then(
    function(res) {
      return res.data;
    }
  );

  // axios.get('http://localhost:4000/registration/getUserByUserName/',requestOptions)
  //     .then(response => {
  //         return  JSON.parse(response.data);
  //     })
}
