// import { authHeader } from './auth-header';
// import store from '~/store';
import { WindowScrollController } from '@fullcalendar/core';
import CryptoJS from 'crypto-js';

export const userService = {
    // constructor(store) {
    //     this.store = store
    // },
    logout,
    getToken,
    getCredentialApi,
    getCheckAuth
};

// function login(email, password) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//     };
//     return fetch(`/users/authenticate`, requestOptions)
//         .then(handleResponse)
//         .then(user => {
//             // login successful if there's a jwt token in the response
//             if (user.token) {
//                 // store user details and jwt token in local storage to keep user logged in between page refreshes
//                 localStorage.setItem('user', JSON.stringify(user));
//             }
//             return user;
//         });
// }

async function logout() {
    // force logout invalid token
    // remove user from local storage to log user out
    localStorage.removeItem('auth.hash');

    //redirect to login page
    window.$nuxt.$router.push('/auth/login');
}

function getToken() {
    // get data token in local storage
   let encryptedText = localStorage.getItem("auth.hash");

   //passphrase
   let passphrase = window.$nuxt.$config.myPassphrase;

    if (encryptedText != null){
        // decrypt text 
        const decryptedText = CryptoJS.AES.decrypt(encryptedText, passphrase).toString(CryptoJS.enc.Utf8);

        //json parsing
        var respon = JSON.parse(decryptedText);

        //console.log('item on user service get token : ', respon);
        if (respon != null){
            return respon.token;
        }
   }

   return null;
}

function getCredentialApi() {
    
    // get data token in local storage
   let encryptedText = localStorage.getItem("api.hash")

   //passphrase
   let passphrase = window.$nuxt.$config.myPassphrase;

   // decrypt text 
   const decryptedText = CryptoJS.AES.decrypt(encryptedText, passphrase).toString(CryptoJS.enc.Utf8);

   //json parsing
   var respon = JSON.parse(decryptedText);

//    console.log('item on user service get credential api : ', window.$nuxt.$config.myPassphrase);
   return respon;
}

function getCheckAuth(moduleId, task) {

    //initial value task
    if (task == null){
        task = 'index';
    }

    var _response;

    //get data store
    window.$nuxt.$store.dispatch('authstate/checkAuth', {
        moduleId : moduleId,
        task : task
    }).then((response) => {

        console.log('getCheckAuth', response);
        return response;
    })
    .catch((error)=>{
        console.log('in user service getCheckAuth catch', error.message);
    });
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
