<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "~/supabase";
import type { InsertOrganization } from "~/supabase/types";

const router = useRouter();

const queryClient = useQueryClient();

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
    queryClient.invalidateQueries({ queryKey: ["organizations"] });

    router.push({
      name: "organizations-index",
    });
  },
});
</script>

<template>
  <main class="mx-auto grid max-w-7xl gap-y-8 px-2 py-4">
    <h1 class="text-4xl font-bold">Create Organization</h1>
    <form class="grid gap-y-3" @submit.prevent="mutate()">
      <div v-show="isError" role="alert" class="alert alert-soft alert-error">
        <Icon icon="bxs:error-circle" />
        <span>{{ error }}</span>
      </div>
      <div class="grid gap-y-1">
        <label for="organization-name" class="label text-sm">Name</label>
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
