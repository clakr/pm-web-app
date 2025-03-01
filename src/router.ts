import {
  createMemoryHistory,
  createRouter,
  type RouterOptions,
} from "vue-router";
import { useAuthStore } from "~/stores/authStore";

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
  {
    name: "organizations-create",
    path: "/organizations/create",
    component: () => import("~/modules/organizations/pages/create.vue"),
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
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;

  try {
    if (to.meta.requiresAuth) {
      await authStore.getSessionUser();

      if (isAuthenticated) {
        return true;
      } else {
        return {
          name: "login",
        };
      }
    } else {
      if (isAuthenticated) {
        return {
          name: from.name,
        };
      } else {
        return true;
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        name: "login",
      };
    }
  }
});
