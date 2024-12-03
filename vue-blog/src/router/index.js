import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import PostManagement from "../views/PostManagement.vue";
import PostDetail from "../views/PostDetail.vue"; // 新增

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/login", name: "Login", component: LoginPage },
  { path: "/register", name: "Register", component: RegisterPage },
  { path: "/posts", name: "PostManagement", component: PostManagement },
  { path: "/posts/:id", name: "PostDetail", component: PostDetail }, // 新增
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
