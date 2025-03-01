import { storeToRefs } from "pinia";
import {
  createMemoryHistory,
  createRouter,
  type RouterOptions,
} from "vue-router";
import { useAuthStore } from "~/stores/authStore";

const routes: RouterOptions["routes"] = [
  {
    name: "login",
    path: "/",
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
    path: "/organizations",
    component: () => import("~/modules/organizations/layouts/base.vue"),
    children: [
      {
        name: "organizations-index",
        path: "",
        component: () => import("~/modules/organizations/pages/index.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        name: "organizations-create",
        path: "create",
        component: () => import("~/modules/organizations/pages/create.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        name: "organizations-edit",
        path: ":organizationId/edit",
        component: () => import("~/modules/organizations/pages/edit.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  const { isAuthenticated } = storeToRefs(authStore);

  try {
    if (to.meta.requiresAuth) {
      await authStore.getSessionUser();

      if (isAuthenticated.value) {
        return true;
      } else {
        return {
          name: "login",
        };
      }
    } else {
      if (isAuthenticated.value) {
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
