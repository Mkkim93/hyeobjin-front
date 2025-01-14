import axios from 'axios';

export const handleLogin = async (username, password) => {
  try {
    const response =  this.axios.post("/login", { username, password }, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    const accessToken = response.headers['authorization'];
    if (accessToken) {
      localStorage.setItem("access", accessToken);
      console.log("Access Token 저장 완료:", accessToken);
    }

    console.log("Refresh Token은 서버 쿠키로 관리");
  } catch (error) {
    console.error('로그인 실패:', error);
    throw new Error("Invalid username or password!");
  }
};

// export const isTokenExpired = (token) => {
//   const payload = JSON.parse(atob(token.split('.')[1]));
//   const exp = payload.exp * 1000;
//   return Date.now() >= exp;
// };

// export const refreshToken = async () => {
//   try {
//     const response = await axios.post("/auth", {}, {
//       withCredentials: true // Allow sending cookies
//     });

//     const newAccessToken = response.headers['Authorization'];
//     if (newAccessToken) {
//       localStorage.setItem("token", newAccessToken);
//       console.log("새로운 Access Token 저장 완료:", newAccessToken);
//     }
//   } catch (error) {
//     console.error("토큰 갱신 실패:", error);
//     throw new Error("Session expired. Please login again.");
//   }
// };

// export const makeApiRequest = async (url) => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token || isTokenExpired(token)) {
//       console.log("토큰 만료, 리프레시 토큰으로 재발급 요청");
//       await refreshToken();
//     }

//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem(token)}`
//       }
//     });

//     console.log("API 호출 성공:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("API 호출 실패:", error);
//     throw error;
//   }
// };