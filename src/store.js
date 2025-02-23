import { createStore } from 'vuex'

export const store = createStore({
    state: {
        myInfoData: null,
        manufactList: [], 
        errorStatus: null, 
        accessToken: null,
    },

    mutations: {
        setMyInfoData(state, data) {
            state.myInfoData = data;
        },

        setManufacturers(state, data) {
            state.manufactList = data;
        },

        setErrorStatus(state, data) {
            state.errorStatus = data;
        },

        setAccessToken(state, token) {
            state.accessToken = token;
        },

        clearAccessToken(state) {
            state.accessToken = null;
        }

    },

    actions: {
        updateManufacturers({ commit }, manufacturers) {
            commit('setManufacturers', manufacturers);
        },

        setErrorStatus({ commit }, status) {
            commit('setErrorStatus', status);
        },

        login({ commit }, token) {
            commit("setAccessToken", token);
        },

        logout({ commit }) {
            commit("clearAccessToken");
        }
    }
})
export default store;