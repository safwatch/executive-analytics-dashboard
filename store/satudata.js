import { satudataService } from '../helpers/satudata/satudata.service';
import { userService } from '../helpers/auth/user.service';
import { responseHelper } from '../helpers/response.helper';
import { payloadHelper } from '../helpers/payload.helper';
import CryptoJS from 'crypto-js';
import { atob } from 'js-base64';


export const state = () => ({
    currentSatuDataToken: sessionStorage.getItem('satudata.token'),
    satuDataTokenList: [],
    satuDataTokenListStatus: null,
});

export const mutations = {
    SET_CURRENT_SATUDATA_TOKEN(state, {passphrase, satudata_token}) {
        state.currentSatuDataToken = satudata_token;
        saveState('satudata.token', satudata_token, passphrase);
    },
    SET_TOKEN_DATE_ACQUIRED(state, {passphrase,date}){
        state.satudataDateAcquired = date;
        saveState('satudata.dateacquired', date, passphrase);
    },
    tokenFailure(state) {
        state.currentSatuDataToken = null;
    },
}

export const getters = {
    // Whether the user is currently logged in.
    signedIn(state) {
        return state.currentSatuDataToken;
    },
}

// check the health of the token
export const actions = {

    // get token by login to satudata
    async getTokenByLogin({ commit, dispatch, getters }, { username, password } = {}){
        
        let current_token = satudataService.getLocalToken();
        let credential = userService.getCredentialApi();

        //init payload
        var payload = {
            client_id : credential.api.client_id,
            username : username,
            password : password,
            client_secret : credential.api.client_secret,
        };

        try {
            var response = await this.$satudataSigninRepo.post(payload);

            const satudata_token = response.result;
            const date = new Date();
            const day = date.toGMTString();

            //get passphrase
            let passphrase = this.$config.myPassphrase

            if(response.status == "ERROR"){
                dispatch('notification/error', response.message, { root: true });
            }else{
                if (response.message != "Error" && satudata_token != null){
                    console.log("---------------   BASED TOKEN     -----------------------");
                    console.log(satudata_token);
                    console.log("--------------------------------------");
                    commit('SET_CURRENT_SATUDATA_TOKEN', {satudata_token, passphrase});
                    commit('SET_TOKEN_DATE_ACQUIRED', {day, passphrase});
                }else{
                    commit('tokenFailure', response.message);
                    dispatch('notification/error', response.result.data.detail, { root: true });
                }
            }
            
            return satudata_token;

        } catch (error) {
            console.log('tokenFailure catch', error.message);
            commit('tokenFailure', error.message);
            dispatch('notification/error', error, { root: true });
        }
    },

    // Validates the current satudata's token
    async validate({ commit}, {token} = {}){
        //passphrase
        let passphrase = btoa(window.$nuxt.$config.myPassphrase);

        var param = '&satudata_token='+token+'&key='+passphrase;
        
        //init param
        let normalParam = payloadHelper.normalParam(param);

        try {
            var response = await this.$satudataCheckTokenRepo.getByParam(normalParam);

            var status = await responseHelper.statusCheck(response.status, response.message);

            return status;
        } catch (error) {
            console.log('[satudata] : error catch auth', error.message);
        }
   },

   // Validates the current satudata's token
   async checkTheToken({commit}, {token} = {}){

        var param = '&token='+token;

        //init param
        let normalParam = payloadHelper.normalParam(param);

        try {
            var response = await this.$satudataCheckTokenRepo.getByParam(normalParam);

            var status = await responseHelper.statusCheck(response.status, response.message);

            return status;
        } catch (error) {
            console.log('[satudata] : error catch auth', error.message);
        }
    },
}
    

// ===
// Private helpers
// ===

function saveState(key, state, passphrase) {
    if (process.browser) {
        let jsonstring = JSON.stringify(state);
        const encryptedText = CryptoJS.AES.encrypt(jsonstring, passphrase).toString();
        localStorage.setItem(key, encryptedText);
    }
}
