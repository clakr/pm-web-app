import {
  createMemoryHistory,
  createRouter,
  type RouterOptions,
} from "vue-router";
import { supabase } from "~/supabase";

const routes: RouterOptions["routes"] = [
  {
    name: "login",
    path: "/login",
    component: () => import("~/modules/authentication/pages/login.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    name: "register",
    path: "/register",
    component: () => import("~/modules/authentication/pages/register.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    name: "organizations-index",
    path: "/",
    component: () => import("~/modules/organizations/pages/index.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const { data } = await supabase.auth.getSession();

  if (to.meta.requiresAuth && data.session) {
    return true;
  } else if (to.meta.requiresAuth && !data.session) {
    return {
      name: "login",
      replace: true,
    };
  } else if (!to.meta.requiresAuth && data.session) {
    return {
      name: from.name,
      replace: true,
    };
  }

  return true;
});
