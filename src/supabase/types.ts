import type { Database } from "~/supabase/gen-types";

export type UserRoles = Database["public"]["Enums"]["user_roles_enum"];

export type InsertOrganization =
  Database["public"]["Tables"]["organizations"]["Insert"];
