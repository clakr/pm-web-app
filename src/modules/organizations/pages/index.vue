<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { Component } from "vue";
import superadmin from "~/modules/organizations/templates/superadmin.vue";
import { useAuthStore } from "~/stores/authStore";
import type { UserRoles } from "~/supabase/types";

const authStore = useAuthStore();
const { role } = storeToRefs(authStore);

const templateMapping: Record<UserRoles, Component> = {
  superadmin,
};
</script>

<template>
  <button type="button" @click="authStore.logoutUser">signout</button>
  <component :is="templateMapping[role]" />
</template>
