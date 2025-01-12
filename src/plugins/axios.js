import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080", // 백엔드 서버의 기본 URL
  withCredentials: true,           // 쿠키 허용 (CORS 설정에 필요)
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;