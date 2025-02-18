import axios from "axios";
import store from "@/store"; // Vuex store 가져오기
import router from "@/router.js";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // 쿠키 허용 (CORS 설정에 필요)
});

// 요청 인터셉터 (Authorization 헤더 추가)
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 (HTTP 상태 코드 감지 및 저장)
instance.interceptors.response.use(
  (response) => {
    store.dispatch("setErrorStatus", null); // 정상 응답이면 errorStatus 초기화
    return response;
  },
  async (error) => {
    if (error.response) {
      const statusCode = error.response.status;
      const errorMessage = error.response.data;
      console.warn("🚨 서버 응답:", errorMessage);

      // ✅ Vuex에 상태 저장 (페이지에서 활용 가능)
      store.dispatch("setErrorStatus", { status: statusCode, message: errorMessage });

      switch (statusCode) {
        case 401: // 인증 필요
          alert("로그인이 필요합니다.");
          localStorage.removeItem("access");
          router.push("/login");
          break;

        case 403: // 접근 권한 없음
          alert("접근 권한이 없습니다.");
          router.push("error/403"); // 접근 불가 페이지로 이동
          break;

        case 404: // 리소스 없음
          alert("요청한 정보를 찾을 수 없습니다.");
          router.push("error/404");
          break;
          
        case 500: // 서버 오류
          alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
          window.location.href = '/error/500';
          break;

        default:
          console.error("❌ HTTP 상태 코드:", statusCode);
      }
    } else {
      console.error("❌ 서버 응답 없음 또는 네트워크 오류");
      store.dispatch("setErrorStatus", { status: 0, message: "네트워크 오류 발생" });
    }

    return Promise.reject(error);
  }
);

export default instance;
