<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useQuery } from "@tanstack/vue-query";
import { supabase } from "~/supabase";
import { can } from "~/utils/permissions";

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
  <main class="mx-auto grid max-w-7xl gap-y-8 px-2 py-4">
    <header class="flex items-end justify-between">
      <h1 class="text-4xl font-bold">Organizations</h1>
      <RouterLink
        v-if="can('CREATE', 'ORGANIZATIONS')"
        to="/organizations/create"
        class="btn justify-self-end"
      >
        <Icon icon="bx:plus" />
        Create Organization
      </RouterLink>
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
          <div
            class="card-title grid grid-cols-[max-content_1fr_max-content] gap-x-4"
          >
            <img src="https://placehold.co/40" alt="" class="rounded" />
            <h2 class="leading-none">
              {{ organization.name }}
            </h2>
            <div class="dropdown dropdown-center">
              <button type="button" class="btn btn-square btn-ghost">
                <Icon icon="bx:dots-vertical-rounded" class="size-5" />
              </button>
              <ul
                tabindex="0"
                class="dropdown-content menu bg-base-100 rounded-box z-1 p-2 shadow-sm"
              >
                <li>
                  <RouterLink :to="`/organizations/${organization.id}`">
                    <Icon icon="bx:show" />
                    View
                  </RouterLink>
                </li>
                <li v-if="can('UPDATE', 'ORGANIZATIONS')">
                  <RouterLink :to="`/organizations/${organization.id}/edit`">
                    <Icon icon="bx:pencil" />
                    Update
                  </RouterLink>
                </li>
                <li v-if="can('DELETE', 'ORGANIZATIONS')">
                  <button type="button">
                    <Icon icon="bx:trash" />
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </RouterLink>
    </section>
  </main>
</template>
