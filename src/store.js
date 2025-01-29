import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            ItemImages: 
                {
                    index: 0,
                    imgUrl: '',
                    name: '스토어 테스트',
                },
        }
    },
})
export default store;