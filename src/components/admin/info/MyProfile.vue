<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="profile-container">
            <h2 class="title">내 정보</h2>

            <div class="space-y-5">
                <div class="input-group">
                    <label for="name">이름</label>
                    <input id="name" v-model="editableData.name" :disabled="!isEditing" class="input-field" />
                </div>

                <div class="input-group">
                    <label for="username">계정명</label>
                    <input id="username" v-model="editableData.username" disabled class="input-field input-disabled" />
                </div>

                <div class="input-group">
                    <label for="userTel">연락처</label>
                    <input id="userTel" v-model="editableData.userTel" :disabled="!isEditing" class="input-field" />
                </div>

                <div class="input-group">
                    <label for="role">권한</label>
                    <p class="input-field input-disabled">
                        {{ editableData.role === 'ROLE_ADMIN' ? '관리자' : '사용자' }}
                    </p>
                </div>

                <div class="input-group">
                    <label for="userMail">메일</label>
                    <input id="userMail" v-model="editableData.userMail" :disabled="!isEditing" class="input-field" />
                </div>
            </div>

            <div class="button-group">
                <button @click="toggleEdit" :class="isEditing ? 'btn-cancel' : 'btn-edit'">
                    {{ isEditing ? '취소' : '수정' }}
                </button>
                <button v-if="isEditing" @click="saveChanges" class="btn-save">저장</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'MyProfile',
    data() {
        return {
            isEditing: false,
            editableData: {} 
        }
    },
    computed: {
        ...mapState(['myInfoData'])
    },
    mounted() {
        console.log('마이 프로필에서 받은 데이터', this.myInfoData);
        this.editableData = { ...this.myInfoData };
    },
    methods: {
        toggleEdit() {
            if (this.isEditing) {
                this.editableData = { ...this.myInfoData };
            }
            this.isEditing = !this.isEditing;
        },
        async saveChanges() {
            this.isEditing = false;
            try {
                const response = await this.$axios.post(`/admin/info`, this.editableData);
                alert(response.data);
                this.$route.go(0);
            } catch (error) {
                console.error('saveChanges error: ', error);
            }
        }
    }
}
</script>

<style scoped>
.bg-gray-100 {
    background-color: #f7f7f7;
}

.profile-container {
    width: 100%;
    max-width: 450px;
    padding: 30px;
    background-color: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    text-align: center; 
}

.title {
    font-size: 22px;
    font-weight: bold;
    color: #444;
    margin-bottom: 20px;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
    text-align: left;
}

.input-group label {
    font-size: 14px;
    font-weight: 500;
    color: #555;
}

.input-field {
    width: 100%;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ddd;
    background-color: white;
    transition: all 0.3s;
    font-size: 14px;
    outline: none;
}

.input-disabled {
    background-color: #f0f0f0;
    color: #888;
    cursor: not-allowed;
}

.button-group {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 30px;
}

button {
    font-size: 14px;
    font-weight: 500;
    padding: 10px 18px;
    border-radius: 6px;
    transition: all 0.3s ease-in-out;
}

.btn-edit {
    background-color: #f39c12;
    color: white;
    border: none;
}

.btn-edit:hover {
    background-color: #e67e22;
}

.btn-save {
    background-color: #27ae60;
    color: white;
    border: none;
}

.btn-save:hover {
    background-color: #2ecc71;
}

.btn-cancel {
    background-color: #e74c3c;
    color: white;
    border: none;
}

.btn-cancel:hover {
    background-color: #c0392b;
}
</style>
