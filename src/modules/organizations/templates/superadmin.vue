<script setup lang="ts">
import CreateOrganizationDialog from "../features/create-organization-dialog.vue";
import { onMounted } from "vue";
import { ref } from "vue";
import { supabase } from "~/supabase";
import type { Database } from "~/supabase/types";

const organizations = ref<
  Database["public"]["Tables"]["organizations"]["Row"][]
>([]);

onMounted(async () => {
  const { data, error } = await supabase.from("organizations").select("*");

  if (error) throw new Error(error.message);

  organizations.value = data;
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

  <pre>{{ organizations }}</pre>

  <CreateOrganizationDialog />
</template>
