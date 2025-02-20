import axios from "axios";
import store from "@/store";
import router from "@/router.js";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, 
});

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

instance.interceptors.response.use(
  (response) => {
    store.dispatch("setErrorStatus", null);
    return response;
  },
  async (error) => {
    if (error.response) {
      const statusCode = error.response.status;
      const errorMessage = error.response.data;
      console.warn("🚨 서버 응답:", errorMessage);

      store.dispatch("setErrorStatus", { status: statusCode, message: errorMessage });

      switch (statusCode) {
        case 401:
          alert("로그인이 필요한 서비스 입니다.");
          window.location.href = '/login';
          localStorage.removeItem("access");
          break;

        case 403:
          alert("접근 권한이 없습니다.");
          window.location.href = '/error/403';
          break;

        case 404:
          alert("요청하신 페이지를 찾을 수 없습니다.");
          window.location.href = '/error/404';
          break;
          
        case 500:
          alert("서버 오류가 발생했습니다. 최대한 빠르게 복구 하도록 하겠습니다.");
          window.location.href = '/error/500';
          break;

        default:
          console.error("Http status code: ", statusCode);
      }
    } else {
      console.error("no server reponse!");
      store.dispatch("setErrorStatus", { status: 0, message: "Network error!" });
    }

    return Promise.reject(error);
  }
);

export default instance;
