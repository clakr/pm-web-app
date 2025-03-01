import type { Database } from "~/supabase/gen-types";

export type UserRoles = Database["public"]["Enums"]["user_role"];

export type InsertOrganization =
  Database["public"]["Tables"]["organizations"]["Insert"];
