import axios from "axios";
import store from "@/store";  // Vuex store 가져오기

const instance = axios.create({
  baseURL: "http://localhost:8080", // 백엔드 서버의 기본 URL
  withCredentials: true,           // 쿠키 허용 (CORS 설정에 필요)
});

// 요청 인터셉터 (Authorization 헤더 추가)
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    console.log('axios.js token', token);

    if (token) {
      config.headers['Authorization'] = `${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (HTTP 상태 코드 감지 및 저장)
instance.interceptors.response.use(
  (response) => {
    console.log('정상 상태 코드', response.status);

    // 정상 응답이면 errorStatus 초기화 (이전 에러 상태 제거)
    store.dispatch('setErrorStatus', null);

    return response;  // 정상 응답 그대로 반환
  },
  (error) => {
    if (error.response) {
      const statusCode = error.response.status;
      console.error("HTTP 상태 코드:", statusCode);

      // 500 이상의 서버 오류일 경우에만 Vuex Store에 상태 코드 저장
      if (statusCode >= 500) {
        store.dispatch('setErrorStatus', statusCode);
      }
    } else {
      console.error("서버 응답 없음 또는 네트워크 오류");
      store.dispatch('setErrorStatus', 0); // 네트워크 오류 (서버 다운 등)
    }
    return Promise.reject(error);
  }
);

export default instance;
