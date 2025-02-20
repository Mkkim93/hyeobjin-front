import axios from '@/plugins/axios.js';

export async function hasRefreshToken() {
    try {
        await axios.post('/auth');
        return true;
    } catch (error) {
        console.error('hasRefreshToken error: ', error.response?.status);
        return false;
    }
}