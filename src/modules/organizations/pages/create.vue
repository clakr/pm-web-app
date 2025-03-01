<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useMutation } from "@tanstack/vue-query";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/authStore";
import { supabase } from "~/supabase";
import type { InsertOrganization } from "~/supabase/types";

const router = useRouter();

const authStore = useAuthStore();

const form = reactive<InsertOrganization>({
  name: "",
});

const { mutate, isError, error } = useMutation({
  mutationFn: async () => {
    const { error, data } = await supabase
      .from("organizations")
      .insert([form])
      .select();
    if (error) throw new Error(error.message);

    return data;
  },
  onSuccess: () => {
    router.push({
      name: "organizations-index",
    });
  },
});
</script>

<template>
  <nav class="border-base-300 border-b p-2">
    <div class="mx-auto flex max-w-7xl items-center justify-between">
      <RouterLink to="/" class="btn btn-ghost">Home</RouterLink>
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
  <main class="mx-auto grid max-w-7xl gap-y-6 px-2 py-4">
    <h1 class="text-4xl font-bold">Create Organization</h1>
    <form class="grid gap-y-3" @submit.prevent="mutate()">
      <div v-show="isError" role="alert" class="alert alert-soft alert-error">
        <Icon icon="bxs:error-circle" />
        <span>{{ error }}</span>
      </div>
      <div class="grid gap-y-1">
        <label for="organization-name" class="label text-sm">Name </label>
        <input
          type="text"
          id="organization-name"
          class="input w-full"
          v-model="form.name"
        />
      </div>
      <button type="submit" class="btn justify-self-end">Create</button>
    </form>
  </main>
</template>
