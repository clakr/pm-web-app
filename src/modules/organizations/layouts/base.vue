<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useAuthStore } from "~/stores/authStore";

const authStore = useAuthStore();
</script>

<template>
  <nav class="border-base-300 border-b p-2">
    <div class="mx-auto flex max-w-7xl items-center justify-between">
      <RouterLink to="/organizations" class="btn btn-ghost"> Home </RouterLink>
      <div class="dropdown dropdown-end dropdown-hover">
        <button type="button" class="btn btn-square border-none bg-transparent">
          <img
            class="size-8 rounded-full"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </button>
        <ul
          tabindex="0"
          class="dropdown-content menu bg-base-100 rounded-box z-1 p-2 shadow-sm"
        >
          <li>
            <button type="button" @click="authStore.logoutUser">
              <Icon icon="bx:exit" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <RouterView />
</template>
