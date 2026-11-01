import { userService } from '../helpers/auth/user.service';
import { responseHelper } from '../helpers/response.helper';
import { payloadHelper } from '../helpers/payload.helper';
import CryptoJS from 'crypto-js';

export const state = () => ({
    currentUser: sessionStorage.getItem('auth.hash'),
    profile: null,
    profileStatus: null
});

export const mutations = {
    SET_CURRENT_USER(state, { passphrase, user }) {
        state.currentUser = user;
        saveState('auth.hash', user, passphrase)
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    SET_PROFILE(state, data) {
        state.profile = data;
        state.profileStatus = data.status;
    },
    SET_PROFILE_FAILURE(state, data) {
        state.profileStatus = data.status;
    },
}

export const getters = {
    // Whether the user is currently logged in.
    loggedIn(state) {
        return state.currentUser
    },
}

export const actions = {
    // init({ state, dispatch }) {
    //     dispatch('validate')
    // },

    // Logs in the current user.
    async logIn({ commit, dispatch, getters }, { username, password, certificateData } = {}) {

        let credential = userService.getCredentialApi();

        let payload;
        let response;

        try {
            if (certificateData) {
                // Shadow login using certificate data
                payload = {
                    client_id: credential.api.client_id,
                    nik: certificateData.subject.UID, // Assuming certificateData has a username field
                    client_secret: credential.api.client_secret,
                    auth_mode: 'SFA', // Pass auth_mode explicitly to identify this as a shadow login
                    fcm_token: "fvWe2HKJTRKiAKX4ftYbyl:APA91bEVXeFzkPUYKpDXzg1G2sP31IbjJUnc3qt-6WGhnei57g89A3HYpz-BDlFEiqBtq9rATw0rhzXBTujxQnIz4_pi2GUCYSSg0yljM4Yfy7NxfAEEfQcfBrHZrund6ZinH-KxWixw"
                };

                response = await this.$userShadowLoginRepo.post(payload); // Use a separate API for shadow login
            } else {
                // Standard login using username and password
                payload = {
                    client_id: credential.api.client_id,
                    username: username,
                    password: password,
                    client_secret: credential.api.client_secret,
                    fcm_token: "fvWe2HKJTRKiAKX4ftYbyl:APA91bEVXeFzkPUYKpDXzg1G2sP31IbjJUnc3qt-6WGhnei57g89A3HYpz-BDlFEiqBtq9rATw0rhzXBTujxQnIz4_pi2GUCYSSg0yljM4Yfy7NxfAEEfQcfBrHZrund6ZinH-KxWixw"
                };
                response = await this.$userLoginRepo.post(payload); // Standard login API
            }
            console.log('response.result', response.result);
            const user = response.result;

            // Get passphrase
            let passphrase = this.$config.myPassphrase;

            if (response.status !== "ERROR") {
                commit('SET_CURRENT_USER', { user, passphrase });
            } else {
                console.log("Login error");
                commit('loginFailure', response.message);
                dispatch('notification/error', response.message, { root: true });
            }

            return user;
        } catch (error) {
            console.log('loginFailure catch', error.message);
            commit('loginFailure', error.message);
            dispatch('notification/error', error, { root: true });
        }

    },

    // Logout the current user.
    async logOut({ commit }) {

        //init payload
        var userToken = userService.getToken();

        var payload = {
            client_id: 'WEB_SIE',
            client_secret: '7408afd5f32d96b7ecda10fb08f7d47f1cad5932',
            token: userToken,
        };

        try {
            var response = await this.$userLogoutRepo.post(payload);
            console.log('response logout', response);

            if (response.status != "ERROR") {
                // remove user from local storage to log user out
                localStorage.removeItem('auth.hash');
                localStorage.removeItem('userCertificate');
                //get passphrase
                let passphrase = this.$config.myPassphrase;
                let user = null;

                commit('SET_CURRENT_USER', { passphrase, user });
            }

            return response.status;
        } catch (error) {
            console.log('logout error : ', error.message);
        }
    },

    // register the user
    register({ commit, dispatch, getters }, { email, password } = {}) {
        if (getters.loggedIn) return dispatch('validate')

        return getFirebaseBackend().registerUser(email, password).then((response) => {
            const user = response
            commit('SET_CURRENT_USER', user)
            return user
        });
    },

    // change passsword user the user
    async changePassword({ commit }, { payload } = {}) {
        //init param
        let normalPayload = payloadHelper.normalPayload(payload);

        try {

            console.log('normalpayload', normalPayload);

            var response = await this.$userChangePasswordRepo.post(normalPayload);

            responseHelper.statusCheck(response.status, response.message);

            return response;
        } catch (error) {
            console.log('error catch changePassword', error.message);
        }
    },

    // Validates the current user's token and refreshes it
    // with new data from the API.
    // eslint-disable-next-line no-unused-vars

    async validate({ commit }, { } = {}) {
        //init param
        let normalParam = payloadHelper.normalParam('');

        try {
            var response = await this.$userProfileRepo.getByParam(normalParam);

            console.log('normalParam', response.message);

            var status = await responseHelper.statusCheck(response.status, response.message);

            return status;
        } catch (error) {
            //  commit('loginFailure', error.message)
            console.log('error catch auth', error.message);
        }
    },

    //get profile
    async getProfile({ commit }, { } = {}) {
        //init param
        let normalParam = payloadHelper.normalParam('');

        try {
            var response = await this.$userProfileRepo.getByParam(normalParam);

            responseHelper.statusCheck(response.status, response.message);

            commit('SET_PROFILE', response);

            return response;
        } catch (error) {
            commit('SET_PROFILE_FAILED', response);
            console.log('error catch auth', error.message);
        }
    },

    async checkAuth({ commit }, { moduleId, task } = {}) {
        var param = '&module_id=' + moduleId + '&task=' + task;

        //init param
        let normalParam = payloadHelper.normalParam(param);

        try {
            var response = await this.$userAuthRepo.getByParam(normalParam);

            await responseHelper.statusCheck(response.status, response.message);

            return response;
        } catch (error) {
            console.log('error catch checkAuth', error.message);
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
