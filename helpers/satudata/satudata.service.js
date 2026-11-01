import { satudataHeader } from './satudata-header';

export const satudataService = {
    signIn,
    getToken,
    checkHealth,
    getLocalToken,
};

function signIn(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };
    return fetch(`/satudata/get_token`, requestOptions)
        .then(handleResponse =>{
            console.log('satudata token signin');
        });
}

function getToken({ commit, dispatch, getters }, { username, password } = {}) {

    let credential = userService.getCredentialApi();

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    return fetch(`/satudata/get_token`, requestOptions)
        .then(handleResponse)
        .then(data => {
            // login successful if there's a jwt token in the response
            if (data.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('satudata_jwt', JSON.stringify(data.token));
            }
            return data;
        });
}

function getLocalToken() {
    
    // get data token in local storage
   let curr_token = localStorage.getItem("satudata.token")

   return curr_token;
}

function checkHealth() {
  const requestOptions = {
      method: 'GET',
      headers: satudataHeader()
  };
  return fetch(`/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    console.log(response);
    // return response.text().then(text => {
    //     const data = text && JSON.parse(text);
    //     if (!response.ok) {
    //         const error = (data && data.message) || response.statusText;
    //         return Promise.reject(error);
    //     }
    //     return data;
    // });
}
