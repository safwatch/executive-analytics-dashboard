import CryptoJS from 'crypto-js';

export default function ({ store, route, redirect }) {

    //get encrypt text from local storage
    let encryptedText = localStorage.getItem("auth.hash");
    // console.log("Encrypted Text: ", encryptedText); // Check if this is a valid encrypted string

    if(encryptedText != null){
        //passphrase
        let passphrase = window.$nuxt.$config.myPassphrase;

        // decrypt text 
        const decryptedText = CryptoJS.AES.decrypt(encryptedText, passphrase).toString(CryptoJS.enc.Utf8);
        // console.log("Decrypted Text: ", decryptedText); // Check the output
        var userData = JSON.parse(decryptedText);
        // If auth is required and the user is logged in...
        if (userData == null) {
          console.log('in midleware null or false');
          redirectToLogin();
        }else{
          window.$nuxt.$store.dispatch('authstate/validate', {}).then((response) => {
            if (response){
              redirect();
            }else{
                console.log('in midleware (auth false)');
                redirectToLogin();
            }
        })
        .catch((error)=>{
            console.log('on mounted login error', error);
            redirectToLogin();
        });
        }
    }else{
      redirectToLogin();
    }

    function redirectToLogin() {
      // Pass the original route to the login component
      redirect('/auth/login')
    }
}
  