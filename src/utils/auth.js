import dayjs from 'dayjs';
import axios from '@/plugins/axios.js';
import { hasRefreshToken } from './checktoken';

function decodeBase64Url(base64Url) {
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    try {
        return decodeURIComponent(
            escape(window.atob(base64)) 
        );
    } catch (e) {
        console.error("Base64 decoding error:", e);
        return null;
    }
}

export function isAccessTokenExpired(token) {
    if (!token) return true;

    try {
        const base64Url = token.split(".")[1];
        const decoded = decodeBase64Url(base64Url);
        if (!decoded) return true;

        const payload = JSON.parse(decoded);
        const currentTime = dayjs().unix();
        return payload.exp < currentTime;

    } catch (error) {
        console.error("isAccessTokenExpired error:", error);
        return true;
    }
}

export async function refreshAccessToken($axios) {

    try {
        // localStorage.removeItem("access");

        const response = await $axios.post("/auth", {}, { withCredentials: true });
        const newAccessToken = response.headers['authorization'];

        if (!newAccessToken) {
            throw new Error("not new token response");
        }
        
        localStorage.setItem("access", newAccessToken);
        return newAccessToken;

    } catch (error) {
        const statusCode = error.response ? error.response.status : 500;
        console.error("Failed to refresh access token:", error.response.status.message);
        store.dispatch('setErrorStatus', statusCode);
        return null;
    }
}

export async function handleAccessValidation($router) {
    const accessToken = localStorage.getItem("access");
    if (!accessToken) {
       const response =  await axios.post('/auth');
       console.log('response', response);
    }

   
    if (!(await hasRefreshToken())) {
        console.warn("Refresh token이 존재하지 않음. 자동 로그아웃 처리");
        // localStorage.removeItem("access"); 
        $router.push("/login");
        return Promise.reject(new Error("Refresh token not found"));
    }

    if (!accessToken || isAccessTokenExpired(accessToken)) {
        try {
            const newAccessToken = await refreshAccessToken(axios);
            
            if (!newAccessToken) {
                console.log("토큰 갱신 실패. 로그인 페이지로 이동");
                $router.push("/login");
                return;
            }
        } catch (error) {
            console.error("handleAccessValidation: 토큰 갱신 중 오류 발생", error);
            $router.push("/login");
            return;
        }
    }
}




