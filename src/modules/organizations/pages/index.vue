<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/authStore";

const authStore = useAuthStore();
const { role } = storeToRefs(authStore);
</script>

<template>
  <button type="button" @click="authStore.logoutUser">signout</button>

  <h1>this is organizations</h1>
  <template v-if="role === 'superadmin'"> superadmin view </template>
  <template v-else-if="role === 'organization-manager'"
    >organization manager view</template
  >
</template>
