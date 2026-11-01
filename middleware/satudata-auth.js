import CryptoJS from 'crypto-js';
import Vue from 'vue'
import AlertModal from '@/components/helpers/AlertModal.vue'; // Import the AlertModal component

export default function ({ store, route, redirect }) {

    //get encrypt text from local storage
    let encryptedText = localStorage.getItem("satudata.token");

    if(encryptedText != null){
        //passphrase
        let passphrase = window.$nuxt.$config.myPassphrase;

        // decrypt text 
        const decryptedText = CryptoJS.AES.decrypt(encryptedText, passphrase).toString(CryptoJS.enc.Utf8);
        var tokenData = JSON.parse(decryptedText);
        // If auth is required and the user is logged in...
        if (tokenData == null) {
          console.log('token is not triggered yet or doesnt exist');
          // do inject information
        }else{
          window.$nuxt.$store.dispatch('satudata/validate', {}).then((response) => {
            if (response){
              console.log(response);
            }else{
                console.log('in midleware (satudata token : is not valid anylonger)');
            }
        })
        }
    }else{
      console.log('SATUDATA : no token is available ')
      // call alert
      const modal = new Vue(AlertModal);
      modal.$mount();
      document.body.appendChild(modal.$el);
    }
}
  