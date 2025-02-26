<script setup lang="ts">
import { useAuthStore } from "~/stores/authStore";

const authStore = useAuthStore();
</script>

<template>
  <button type="button" @click="authStore.logoutUser">signout</button>
  <h1>this is organizations</h1>
</template>
