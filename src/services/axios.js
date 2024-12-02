import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7241/api" //Base BE API url
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("my_access_token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config
    },
    (error) => Promise.reject.apply(error)
);

let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(callback){
    refreshSubscribers.push(callback);
}

function onRefreshed(newToken){
    refreshSubscribers.forEach((callback) => callback(newToken));
    refreshSubscribers = [];
}

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshToken = localStorage.getItem("my_refresh_token");
          const accessToken = localStorage.getItem("my_access_token");
          const uid = localStorage.getItem("my_uid");
          const response = await api.post("/account/refreshtoken", { 
            refresh_token: refreshToken,
            access_token: accessToken,
            user_id: uid
            });

          const newAccessToken = response.data.access_token;
          localStorage.setItem("my_access_token", newAccessToken);

          onRefreshed(newAccessToken);
          isRefreshing = false;
        } catch (refreshError) {
          isRefreshing = false;
          localStorage.removeItem("my_access_token");
          localStorage.removeItem("my_refresh_token");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }

      // Queue the failed request until the token is refreshed
      return new Promise((resolve) => {
        subscribeTokenRefresh((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(api(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default api;