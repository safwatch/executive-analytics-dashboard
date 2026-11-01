import { userService } from './auth/user.service';

export const responseHelper = {
    statusCheck,
}

async function statusCheck (status, message) {
    // if status ERROR
    if(status == "ERROR"){
        // console.log('error in check status helper', message);
        if (message == "Invalid token"){
            console.log('here hu');
            await userService.logout();
            // return false;
        }
        return false;
    }else{
        return true;
    }    
}