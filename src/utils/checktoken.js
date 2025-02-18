import axios from '@/plugins/axios.js';

export async function hasRefreshToken() {
    try {
        const response = await axios.get('/auth/checkrefresh');
        console.log('✅ 서버 응답:', response.data);
        return true;
    } catch (error) {
        console.error('❌ Refresh token 확인 실패:', error.response?.status);
        return false;
    }
}