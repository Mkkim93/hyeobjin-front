import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080", // 백엔드 서버의 기본 URL
  withCredentials: true,           // 쿠키 허용 (CORS 설정에 필요)
});

export default instance;