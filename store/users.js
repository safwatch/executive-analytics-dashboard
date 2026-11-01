import { responseHelper } from '../helpers/response.helper';
import { userService } from '../helpers/auth/user.service';
import { payloadHelper } from '../helpers/payload.helper';

export const state = () => ({
    userList: [],
    userListStatus: null,
    user: null,
    isAuthenticated: false,
});

export const mutations = {
    SET_USER_LIST(state, data) {
        state.userList = data;
        state.userListStatus = data.status;
    },
    SET_USER_LIST_FAILURE(state, data) {
        state.userListStatus = data;
    },
    SET_USER(state, userData) { // Mutation to set user data
        state.user = userData;
        state.isAuthenticated = true; // Mark as authenticated
    },
    CLEAR_USER(state) { // Mutation to clear user data
        state.user = null;
        state.isAuthenticated = false; // Reset authentication status
    },
}

export const actions = {
    init({ state, dispatch }) {
        dispatch('validate')
    },

    //get user list 
    async getUsers({ commit }, { start, limit } = {}) {
        //init param
        var param = '&start=' + start + '&limit=' + limit;
        let normalParam = payloadHelper.normalParam(param);

        try {
            var response = await this.$userListRepo.getByParam(normalParam);

            var status = responseHelper.statusCheck(response.status, response.message);

            commit('SET_USER_LIST', response);

            return status;
        } catch (error) {
            console.log('error catch', error.message);
            commit('SET_USER_LIST_FAILURE', error.message);
        }

    },

    //insert user list 
    async insertUser({ commit, dispatch, getters }, { payload } = {}) {
        //init param
        let normalPayload = payloadHelper.normalPayload(payload);

        try {
            var response = await this.$userCreateRepo.post(normalPayload);

            responseHelper.statusCheck(response.status, response.message);

            return response;
        } catch (error) {
            console.log('error catch', error.message);
        }

    },

    //update data user 
    async updateUser({ commit, dispatch, getters }, { payload } = {}) {
        //init param
        let normalPayload = payloadHelper.normalPayload(payload);

        console.log('normalPayload', normalPayload);

        try {
            var response = await this.$userUpdateRepo.post(normalPayload);

            responseHelper.statusCheck(response.status, response.message);

            return response;
        } catch (error) {
            console.log('error catch', error.message);
        }

    },

    // update password
    async updatePassword({ }, { payload } = {}) {
        //init param
        let normalPayload = payloadHelper.normalPayload(payload);

        try {
            var response = await this.$userReseteRepo.post(normalPayload);

            responseHelper.statusCheck(response.status, response.message);

            return response;
        } catch (error) {
            console.log('error catch', error.message);
        }

    },

    //delete user 
    async deleteUser({ commit, dispatch, getters }, { payload } = {}) {
        //init param
        let normalPayload = payloadHelper.normalPayload(payload);

        try {
            var response = await this.$userDeleteRepo.post(normalPayload);

            responseHelper.statusCheck(response.status, response.message);

            return response;
        } catch (error) {
            console.log('error catch', error.message);
        }

    },
    async updateAuthMode({ commit, dispatch, getters }, { payload } = {}) {
        // Prepare the payload to be sent to the backend
        let normalPayload = payloadHelper.normalPayload(payload); // Assuming you have a helper to normalize the payload
        try {
            // Send a POST request to update the user's auth_mode using the normalized payload
            const response = await this.$userUpdateAuthModeRepo.post(normalPayload);

            // Check the response status
            if (response.status === 'OK') {
                return true; // Successfully updated
            } else {
                throw new Error('Failed to update auth mode'); // Handle error response
            }
        } catch (error) {
            console.error('Error in updateAuthMode:', error);
            throw error; // Propagate error to the calling method
        }
    },

    // Action to set user from the certificate
    setUserFromCertificate({ commit }, certificateData) {
        // Create a user object from the certificate data
        const user = {
            commonName: certificateData.subject.CN || '',  // Common Name
            organizationalUnit: certificateData.subject.OU || '',  // Organizational Unit
            organization: certificateData.subject.O || '',  // Organization
            // Include other relevant data if necessary
        };

        // Commit the mutation to set user data in the state
        commit('SET_USER', user);
    },

    // Action to clear user
    clearUser({ commit }) {
        commit('CLEAR_USER');
    }
}
