<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { supabase } from "~/supabase";
import type { Organization, UpdateOrganization } from "~/supabase/types";

const router = useRouter();
const route = useRoute();
const organizationId = route.params.organizationId.toLocaleString();

const queryClient = useQueryClient();

const { data: organization } = useQuery({
  queryKey: ["organizations", organizationId],
  queryFn: async () => {
    const { error, data } = await supabase
      .from("organizations")
      .select()
      .eq("id", organizationId);

    if (error) throw new Error(error.message);

    return data;
  },
  initialData: () => {
    const organizations = queryClient.getQueryData(["organizations"]);
    if (!organizations) return undefined;

    return (organizations as Organization[]).filter(
      (organization) => organizationId === organization.id,
    );
  },
});

const form = reactive<UpdateOrganization>({
  name: organization.value?.at(0)?.name,
});

const { mutate, isError, error } = useMutation({
  mutationFn: async () => {
    const { data, error } = await supabase
      .from("organizations")
      .update(form)
      .eq("id", organizationId)
      .select();

    if (error) throw new Error(error.message);

    return data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["organizations", organizationId],
    });

    router.push({
      name: "organizations-index",
    });
  },
});
</script>

<template>
  <main class="mx-auto grid max-w-7xl gap-y-8 px-2 py-4">
    <h1 class="text-4xl font-bold">Edit Organization</h1>
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
      <button type="submit" class="btn justify-self-end">Update</button>
    </form>
  </main>
</template>
