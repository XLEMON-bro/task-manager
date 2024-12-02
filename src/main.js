import Vue from 'vue'
import App from './App.vue'
import router from './router'
import api from "@/services/axios"

Vue.config.productionTip = false

const refreshToken = async () => {
  const token = localStorage.getItem("my_refresh_token");
  const accessToken = localStorage.getItem("my_access_token");
  const uid = localStorage.getItem("my_uid");
  if (token) {
    try {
      const response = await api.post("/account/refreshtoken", {
        refresh_token: token,
        access_token: accessToken,
        user_id: uid
      });

      localStorage.setItem("my_refresh_token", response.data.refresh_token);
      localStorage.setItem("my_access_token", response.data.access_token);
      localStorage.setItem("my_uid", response.data.user_id);
    } catch {
      localStorage.removeItem("my_access_token");
      localStorage.removeItem("my_refresh_token");
      localStorage.removeItem("my_uid");
      router.push("/login");
    }
  }
};

refreshToken().finally(() => {
  new Vue({
    router,
    render: (h) => h(App),
  }).$mount("#app");
});
