import type {
  Enums,
  Tables,
  TablesInsert,
  TablesUpdate,
} from "~/supabase/gen-types";

export type UserRoles = Enums<"user_roles_enum">;

export type Organization = Tables<"organizations">;
export type InsertOrganization = TablesInsert<"organizations">;
export type UpdateOrganization = TablesUpdate<"organizations">;
