import dayjs from 'dayjs';

// Base64 디코딩 (브라우저 환경에서도 안전하게 동작)
function decodeBase64Url(base64Url) {
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    try {
        return decodeURIComponent(
            escape(window.atob(base64)) // UTF-8 안전한 디코딩
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
        const newAccessToken = response.headers['authorization'];

        localStorage.setItem("access", newAccessToken);

        console.log("New access token set:", newAccessToken);
        return newAccessToken;
    } catch (error) {
        console.error("Failed to refresh access token:", error);
        return null;
    }
}

// 유효성 검증 및 리디렉션
export async function handleAccessValidation($axios, $router) {
    const accessToken = localStorage.getItem("access");
    console.log('$axios', $axios);
    console.log('$router', $router);
    console.log('handleAccessValidation : access token ', accessToken);
    console.log('어디로 가나요');
    // Access token이 없거나 만료된 경우 새로 발급받기
    if (!accessToken || isAccessTokenExpired(accessToken)) {

        const newAccessToken = await refreshAccessToken($axios);
        if (!newAccessToken) {
            console.log("Unable to refresh token. Redirecting to login.");
            $router.push("/login");
            return;
        }
    }

    // 유효한 토큰으로 API 요청
    const tokenToUse = localStorage.getItem("access");
    console.log('샌드 api 로 가는 access 토큰', tokenToUse);
    await sendApiRequest($axios, tokenToUse, $router);
}

// API 요청
export async function sendApiRequest($axios, accessToken, $router) {
    try {
        const response = await $axios.get("/admins", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${accessToken}`
            },
        });

        if ($router.currentRoute.value.path !== "/admin") {
            $router.push("/admin");
        }

        console.log("Admin page access granted", response.data);
    } catch (error) {
        console.error("Failed to access admin API:", error);
        console.log('샌드 api 에서 엑세스토큰 검증', accessToken);
        $router.push("/login");
    }
}


