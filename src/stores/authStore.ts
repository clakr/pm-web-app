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

    router.push({
      name: "login",
      replace: true,
    });
  }

  async function getSessionUser() {
    if (auth.value) return;

    const { error, data } = await supabase.auth.getUser();

    if (error) throw new Error(error.message);

    auth.value = data.user;
  }

  return { auth, isAuthenticated, loginUser, logoutUser, getSessionUser };
});
