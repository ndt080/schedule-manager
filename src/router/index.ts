import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "@/middlewares/auth.guard";
import { UserStorageService } from "@/services/storage/user-storage.service";
import { RouterPaths } from "@/core/consts/router-paths";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: `/${RouterPaths.HOME}`,
      name: "Home",
      meta: { layout: "HomeLayout", auth: true },
      component: HomeView
    },
    {
      path: `/${RouterPaths.SETTINGS}`,
      name: "Settings",
      meta: { layout: "HomeLayout", auth: true },
      component: () => import("../views/SettingsView.vue"),
    },
    {
      path: `/${RouterPaths.PROFILE}`,
      name: "Profile",
      meta: { layout: "HomeLayout", auth: true },
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: `/${RouterPaths.LOGIN}`,
      name: "Login",
      meta: { layout: "AuthLayout", auth: false },
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: `/${RouterPaths.REGISTER}`,
      name: "Register",
      meta: { layout: "AuthLayout", auth: false },
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: `/${RouterPaths.FORGET_PASSWORD}`,
      name: "Forget password",
      meta: { layout: "AuthLayout", auth: false },
      component: () => import("../views/ForgetPasswordView.vue"),
    },
    {
      path: `/${RouterPaths.NOT_VERIFIED}`,
      name: "NOT VERIFIED",
      meta: { layout: "AuthLayout", auth: false },
      component: () => import("../views/NotVerifiedView.vue"),
    },
    {
      path:  `/${RouterPaths.NOT_FOUND}`,
      name: "Not found",
      meta: { layout: "HomeLayout", auth: true },
      component: () => import("../views/NotFoundView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: `/${RouterPaths.WORKSPACE}/:id`,
      name: "Workspace",
      meta: { layout: "HomeLayout", auth: true },
      component: () => import("../views/WorkspaceView.vue")
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some((record) => record.meta.auth);
  const currentUser = UserStorageService.getUser();
  const isVerified = !!UserStorageService.getUser()?.isVerified

  authGuard(next, !(requireAuth && !currentUser && !isVerified));
  // authGuard(next, requireAuth && !!currentUser && isVerified);
});

export default router;
