import satudataCheckToken from '~/helpers/satudata/satudata.check.token';

// export default (app, inject) => {
export default async function ({ app}, inject) {
    const satudataCheckTokenHelper  = satudataCheckToken(app.store);
    
    inject('satudataCheckToken', satudataCheckTokenHelper())
}

  
  