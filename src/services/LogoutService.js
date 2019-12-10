function logoutuser() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    return 0;
}

export default logoutuser;