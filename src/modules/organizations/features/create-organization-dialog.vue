<script setup lang="ts">
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { reactive } from "vue";
import { supabase } from "~/supabase";
import type { Database } from "~/supabase/types";

const queryClient = useQueryClient();

const form = reactive<Database["public"]["Tables"]["organizations"]["Insert"]>({
  name: "",
});

const { isError, error, mutate, data } = useMutation({
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
    create_organization_modal.close();
  },
});
</script>

<template>
  <dialog id="create_organization_modal" class="modal">
    <form class="modal-box grid gap-y-4" @submit.prevent="mutate()">
      <span v-if="isError">{{ error }}</span>
      <span>{{ data }}</span>
      <div class="grid">
        <h3 class="text-lg/tight font-bold">Create Organization</h3>
        <p class="text-base-content/50 text-sm">
          random description here for create organization
        </p>
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
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
