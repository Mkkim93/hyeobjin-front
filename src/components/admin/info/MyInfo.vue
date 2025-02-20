<template>
    <div class="custom-modal-overlay">
        <div class="custom-modal">
            <h3 class="modal-title">로그인</h3>
            <p class="modal-subtitle">아이디와 비밀번호를 입력해주세요</p>

            <div class="input-group">
                <label for="username">아이디</label>
                <input id="username" type="text" v-model="username" class="input-field"/>
            </div>

            <div class="input-group">
                <label for="password">비밀번호</label>
                <input id="password" type="password" v-model="password" class="input-field"/>
            </div>

            <button @click="fetchMyInfoCheck" class="confirm-btn">확인</button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'MyInfo',
    data() {
        return {
            username: '',
            password: '',
            myInfoData: {},
        }
    },

    methods: {
        async fetchMyInfoCheck() {
            const username = this.username;
            const password = this.password;

            try {
                const response = await this.$axios.post(`/admin/info/check?username=${username}&password=${password}`);

                this.myInfoData = response.data;

                this.$store.commit('setMyInfoData', response.data);
                this.$router.push('/admin/profile');

            } catch (error) {
                alert('사용자 정보를 잘못 입력하셨습니다.');
                console.error('fetchMyInfoCheck error', error);
            }
        },
    },
}
</script>

<style scoped>
.custom-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050;
    animation: fadeIn 0.3s ease-out;
}

.custom-modal {
    background: #fefefe;
    padding: 25px;
    border-radius: 12px;
    width: 350px;
    max-width: 90%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    text-align: center;
    animation: slideUp 0.3s ease-out;
}

.modal-title {
    font-size: 22px;
    font-weight: bold;
    color: #4a4a4a;
    margin-bottom: 5px;
}

.modal-subtitle {
    font-size: 14px;
    color: #7a7a7a;
    margin-bottom: 15px;
}

.input-group {
    text-align: left;
    margin-bottom: 12px;
}

.input-group label {
    font-size: 14px;
    color: #666;
    font-weight: 500;
    display: block;
    margin-bottom: 5px;
}

.input-field {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 14px;
    background-color: #fafafa;
    transition: all 0.3s;
}

.input-field:focus {
    border-color: #b19777;
    outline: none;
    background-color: #fff;
}

.confirm-btn {
    width: 100%;
    padding: 12px;
    background-color: #b19777;
    color: white;
    font-size: 15px;
    font-weight: 500;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
}

.confirm-btn:hover {
    background-color: #a18265;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}
</style>
