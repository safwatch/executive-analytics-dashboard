import userCheckAuth from '~/helpers/auth/user.check.auth';

// export default (app, inject) => {
export default async function ({ app}, inject) {
    const userCheckAuthHelper  = userCheckAuth(app.store);
    
    inject('userCheckAuth', userCheckAuthHelper())
}

  
  