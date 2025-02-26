import type {
  SignInWithPasswordCredentials,
  User,
} from "@supabase/supabase-js";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "~/supabase";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();

  const auth = ref<User | null>(null);
  const isAuthenticated = computed(() => !!auth.value);

  async function loginUser(payload: SignInWithPasswordCredentials) {
    const { error, data } = await supabase.auth.signInWithPassword(payload);

    if (error) throw new Error(error.message);

    await getAuthRole();

    auth.value = data.user;

    router.push({
      name: "organizations-index",
      replace: true,
    });
  }
  async function logoutUser() {
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);

    auth.value = null;
    role.value = null;

    router.push({
      name: "login",
      replace: true,
    });
  }
  async function getSessionUser() {
    if (auth.value) return;

    const { error, data } = await supabase.auth.getUser();

    if (error) throw new Error(error.message);

    await getAuthRole();

    auth.value = data.user;
  }

  //

  const role = ref<string | null>(null);

  async function getAuthRole() {
    const { error, data } = await supabase.from("user_roles").select();

    if (error) throw new Error(error.message);

    const userData = data.at(0);
    if (!userData) throw new Error("no data found");

    role.value = userData.role_name;
  }

  return {
    auth,
    isAuthenticated,
    loginUser,
    logoutUser,
    getSessionUser,

    role,
    getAuthRole,
  };
});
