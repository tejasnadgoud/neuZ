import axios from 'axios';

// export const loginuser = data => {
// //function login(data){
//     localStorage.setItem('user', data);

// 	return axios.post('http://localhost:4000/registration/login', data)
// 		.then(res => res.status)
	
// }

// export const logoutuser = () => {
//     // remove user from local storage to log user out
//     localStorage.removeItem('user');
// }


const loginuser = (user_name,password) => {
	var data = JSON.stringify({ user_name, password });
    localStorage.setItem('user', user_name);
	return axios.post('http://localhost:4000/registration/login', data)
		.then(res => res.status)
}

export default loginuser;
