import { createStore } from 'vuex'

const store = createStore({
    state: {
        manufactList: [], // 사용할 컴포넌트에서 mapState(['manufactList']) 로 감싸서 아래 mutations 와 actions 에서 업데이트한 데이터를 가지고 간다.
        errorStatus: null, 
    },

    mutations: {
        setManufacturers(state, manufacturers) {
            state.manufactList = manufacturers;
        },

        setErrorStatus(status) {
            this.errorStatus = status;
        }
    },

    actions: {
        // 2. 받은 데이터를 업데이트 시켜준다.
        updateManufacturers({ commit }, manufacturers) {
            commit('setManufacturers', manufacturers);
        },

        setErrorStatus({ commit }, status) { // 뮤테이션을 호출하도록 수정
            commit('setErrorStatus', status);
        }
    }
})
export default store;