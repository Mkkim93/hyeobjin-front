import { createStore } from 'vuex'

export const store = createStore({
    state: {
        myInfoData: null,
        manufactList: [], 
        errorStatus: null, 
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

    },

    actions: {
        updateManufacturers({ commit }, manufacturers) {
            commit('setManufacturers', manufacturers);
        },

        setErrorStatus({ commit }, status) {
            commit('setErrorStatus', status);
        },
    }
})
export default store;