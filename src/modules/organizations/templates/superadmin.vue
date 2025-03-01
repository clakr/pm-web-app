<script setup lang="ts">
import CreateOrganizationDialog from "../features/create-organization-dialog.vue";
import { useQuery } from "@tanstack/vue-query";
import { supabase } from "~/supabase";

const { data } = useQuery({
  queryKey: ["organizations"],
  queryFn: async () => {
    const { error, data } = await supabase.from("organizations").select();

    if (error) throw new Error(error.message);

    return data;
  },
});
</script>

<template>
  <button
    type="button"
    class="btn"
    onclick="create_organization_modal.showModal()"
  >
    Create Organization
  </button>

  <pre>{{ data }}</pre>

  <CreateOrganizationDialog />
</template>
