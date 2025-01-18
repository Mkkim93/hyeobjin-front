<template>
    <p>관리자 페이지 입니다.</p>
</template>

<script>
import dayjs from 'dayjs';

export default {
    name: 'Admin',
    data() {
        return {};
    },

    created() {
        this.handleAccessValidation();
    },

    methods: {
        async handleAccessValidation() {
            const accessToken = localStorage.getItem("access");

            // Access token이 없거나 만료된 경우 새로 발급받기
            if (!accessToken || this.isAccessTokenExpired(accessToken)) {
                const newAccessToken = await this.refreshAccessToken();
                if (!newAccessToken) {
                    console.log("Unable to refresh token. Redirecting to login.");
                    this.$router.push("/login");
                    return;
                }
            }

            // 유효한 토큰으로 API 요청
            const tokenToUse = localStorage.getItem("access");
            await this.sendApiRequest(tokenToUse);
        },

        isAccessTokenExpired(token) {
            if (!token) return true;

            try {
                 // Base64 디코딩
                const base64Url = token.split('.')[1]; // JWT의 payload 부분
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const payload = JSON.parse(atob(base64));

                 // 발급 시간과 만료 시간을 출력
                const issuedAt = dayjs.unix(payload.iat).format('YYYY-MM-DD HH:mm:ss'); // 발급 시간
                const expirationTime = dayjs.unix(payload.exp).format('YYYY-MM-DD HH:mm:ss'); // 만료 시간

                console.log(`발급 시간 (iat): ${issuedAt}`);
                console.log(`만료 시간 (exp): ${expirationTime}`);

                // 현재 시간과 만료 시간 비교
                const currentTime = dayjs().unix(); // 현재 시간 (초 단위 UNIX 타임스탬프)
                return payload.exp < currentTime;
            } catch (error) {
                console.error("isAccessTokenExpired error:", error);
                return true;
            }
        },

        async refreshAccessToken() {
            localStorage.removeItem("access");
            try {
                
                const response = await this.$axios.post("/auth");
                const newAccessToken = response.headers["access"];
                
                localStorage.setItem("access", newAccessToken);

                console.log("New access token set:", newAccessToken);
                return newAccessToken;
            } catch (error) {
                console.error("Failed to refresh access token:", error);
                return null;
            }
        },

        async sendApiRequest(accessToken) {
            try {
                const response = await this.$axios.get("/admin", {
                    headers: {
                        Authorization: `${accessToken}`,
                    },
                });
                console.log("Admin page access granted", response.data);
            } catch (error) {
                console.error("Failed to access admin API:", error);
                this.$router.push("/login");
            }
        },
    },
};
</script>

<style>

</style>