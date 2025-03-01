import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/authStore";
import type { UserRoles } from "~/supabase/types";

export enum Actions {
  CREATE = "create",
}

export enum Modules {
  ORGANIZATIONS = "organizations",
}

type EnumValue<T> = T[keyof T];

type ModuleActionPermissions = {
  [key in EnumValue<typeof Modules>]?: {
    [key in EnumValue<typeof Actions>]?: UserRoles[];
  };
};

const moduleActionPermissions: ModuleActionPermissions = {
  organizations: {
    create: ["superadmin", "organization-manager"],
  },
};

export function can(
  action: keyof typeof Actions,
  module: keyof typeof Modules,
): boolean {
  const { role } = storeToRefs(useAuthStore());

  const allowedRolesForModuleAndAction =
    moduleActionPermissions[Modules[module]]?.[Actions[action]] || [];

  return allowedRolesForModuleAndAction.includes(role.value);
}
