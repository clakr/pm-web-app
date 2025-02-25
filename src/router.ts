import {
  createMemoryHistory,
  createRouter,
  type RouterOptions,
} from "vue-router";

const routes: RouterOptions["routes"] = [
  {
    path: "/",
    component: () => import("~/modules/authentication/pages/login.vue"),
  },
  {
    path: "/register",
    component: () => import("~/modules/authentication/pages/register.vue"),
  },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
