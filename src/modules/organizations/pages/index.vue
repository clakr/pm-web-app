<script setup lang="ts">
import { useRouter } from "vue-router";
import { supabase } from "~/supabase";

const router = useRouter();

async function handleLogout() {
  await supabase.auth.signOut();

  router.push({
    name: "login",
    replace: true,
  });
}
</script>

<template>
  <button type="button" @click="handleLogout">signout</button>
  <h1>this is organizations</h1>
  <RouterLink to="/login"> login </RouterLink>
</template>
