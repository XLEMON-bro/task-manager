import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/LoginView.vue";
import Dashboard from "@/views/PageDashboard.vue";
import MainPage from "@/views/MainPage.vue";
import Register from "@/views/RegisterView.vue"

const router = new Router({
  mode: "history",
  routes: [
    { path: "/", redirect: "/main" },
    { path: "/main", component: MainPage },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    {
      path: "/dashboard",
      component: Dashboard,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem("my_access_token");

  if (to.meta.requiresAuth && !accessToken) {
    return next("/login");
  }

  next();
});

Vue.use(Router);

export default router;