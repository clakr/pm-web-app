<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useQuery } from "@tanstack/vue-query";
import CreateOrganizationDialog from "~/modules/organizations/features/create-organization-dialog.vue";
import { useAuthStore } from "~/stores/authStore";
import { supabase } from "~/supabase";
import { can } from "~/utils/permissions";

const authStore = useAuthStore();

const { data: organizations } = useQuery({
  queryKey: ["organizations"],
  queryFn: async () => {
    const { error, data } = await supabase.from("organizations").select();

    if (error) throw new Error(error.message);

    return data;
  },
});
</script>

<template>
  <nav class="border-base-300 border-b p-2">
    <div class="mx-auto flex max-w-7xl items-center justify-end">
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
  <main class="mx-auto grid max-w-7xl gap-y-8 px-2 py-4">
    <header class="flex items-end justify-between">
      <h1 class="text-4xl font-bold">Organizations</h1>
      <button
        v-if="can('CREATE', 'ORGANIZATIONS')"
        type="button"
        class="btn justify-self-end"
        onclick="create_organization_modal.showModal()"
      >
        Create Organization
      </button>
    </header>
    <section
      class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-x-8 gap-y-6"
    >
      <RouterLink
        v-for="organization in organizations"
        :key="organization.id"
        class="card bg-base-100 link no-underline shadow-sm"
        :to="`/organizations/${organization.id}`"
      >
        <div class="card-body">
          <h2 class="card-title">
            {{ organization.name }}
          </h2>
        </div>
      </RouterLink>
    </section>
  </main>

  <CreateOrganizationDialog />
</template>
