import dayjs from 'dayjs';
import { hasRefreshToken } from './checktoken';

// Base64 디코딩 (브라우저 환경에서도 안전하게 동작)
function decodeBase64Url(base64Url) {
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    try {
        return decodeURIComponent(
            escape(window.atob(base64)) // UTF-8 디코딩
        );
    } catch (e) {
        console.error("Base64 decoding error:", e);
        return null;
    }
}

// access token 만료 여부 체크
export function isAccessTokenExpired(token) {
    if (!token) return true;

    try {
        const base64Url = token.split(".")[1]; // JWT의 payload 부분
        const decoded = decodeBase64Url(base64Url);
        if (!decoded) return true; // 디코딩 실패 시 만료된 것으로 처리

        const payload = JSON.parse(decoded);

        const issuedAt = dayjs.unix(payload.iat).format("YYYY-MM-DD HH:mm:ss"); // 발급 시간
        const expirationTime = dayjs.unix(payload.exp).format("YYYY-MM-DD HH:mm:ss"); // 만료 시간

        console.log(`발급 시간 (iat): ${issuedAt}`);
        console.log(`만료 시간 (exp): ${expirationTime}`);
        console.log(`디코딩 확인 (payload) : , ${payload}`);

        console.log("Decoded Payload:", payload);
        console.log("Role in Payload:", payload.roles); // 예: 'role' 필드가 포함되었는지 확인
        console.log("Decoded Payload Keys:", Object.keys(payload)); // 객체의 키 확인

        // 현재 시간과 만료 시간 비교
        const currentTime = dayjs().unix();
        return payload.exp < currentTime;
    } catch (error) {
        console.error("isAccessTokenExpired error:", error);
        return true;
    }
}

// 토큰 갱신
export async function refreshAccessToken($axios) {
    console.log("refreshAccessToken() 실행");

    try {
        localStorage.removeItem("access");

        const response = await $axios.post("/auth", {}, { withCredentials: true });
        console.log('response.status', response.status);
        console.log('response.data.message', response.data.message);

        const newAccessToken = response.headers['authorization'];

        if (!newAccessToken) {
            throw new Error("응답에 새로운 토큰이 없음");
        }

        localStorage.setItem("access", newAccessToken);

        console.log("New access token set:", newAccessToken);
        return newAccessToken;
    } catch (error) {
        const statusCode = error.response ? error.response.status : 500;
        console.error("Failed to refresh access token:", error.response.status.message);

        // Vuex 상태 업데이트 (axios.js에서 에러 핸들링을 위해)
        store.dispatch('setErrorStatus', statusCode);

        return null; // 실패 시 null 반환
    }
}
// 유효성 검증 및 리디렉션
// 유효성 검증 및 리디렉션

export async function handleAccessValidation($router) {
    const accessToken = localStorage.getItem("access");
    console.log("✅ 현재 저장된 Access Token:", accessToken);

    // ✅ `hasRefreshToken()`을 `await`으로 호출해야 정확한 결과 확인 가능
    if (!(await hasRefreshToken())) {
        console.warn("🚨 Refresh token이 존재하지 않음. 자동 로그아웃 처리");
        localStorage.removeItem("access"); // ✅ 액세스 토큰 삭제
        $router.push("/login"); // ✅ 로그인 페이지로 이동
        return Promise.reject(new Error("Refresh token not found"));
    }

    if (!accessToken || isAccessTokenExpired(accessToken)) {
        try {
            const newAccessToken = await refreshAccessToken(axios);

            if (!newAccessToken) {
                console.log("❌ 토큰 갱신 실패. 로그인 페이지로 이동");
                $router.push("/login");
                return;
            }
        } catch (error) {
            console.error("handleAccessValidation: 토큰 갱신 중 오류 발생", error);
            $router.push("/login");
            return;
        }
    }

    console.log("✅ 인증 검증 완료. 토큰 유지됨.");
}




