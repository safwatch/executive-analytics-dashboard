import { userService } from '../helpers/auth/user.service';

export const payloadHelper = {
    normalPayload,
    normalParam
}

function normalPayload(payload) {
    // get data token in local storage
    let  userToken = userService.getToken();

   // get data credential api in local storage
   let credential = userService.getCredentialApi();

    let templatePayload = {
        client_id : credential.api.client_id,
        client_secret : credential.api.client_secret,
        token : userToken
    };

    return  Object.assign(templatePayload, payload);
}

function normalParam(param) {
    // get data token in local storage
    let  userToken = userService.getToken();

    // get data credential api in local storage
   let  credential = userService.getCredentialApi();

    var normalParameter = 'client_id='+credential.api.client_id+'&client_secret='+credential.api.client_secret+'&token='+userToken+param;

    return  normalParameter;
}