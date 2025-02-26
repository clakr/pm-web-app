<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <main class="grid min-h-svh place-content-center">
    <form class="grid w-md gap-y-3">
      <div class="text-center">
        <h1 class="gap-x-1">
          Welcome to
          <pre class="inline">pm-web-app</pre>
        </h1>
        <p class="text-sm">
          Don't have an account?
          <RouterLink to="/register" class="link">Sign Up</RouterLink>
        </p>
      </div>
      <div class="grid gap-y-1">
        <label for="login-email" class="label text-sm">Email</label>
        <input type="email" id="login-email" class="input w-full" />
      </div>
      <div class="grid gap-y-1">
        <label for="login-password" class="label text-sm">Password</label>
        <input type="password" id="login-password" class="input w-full" />
      </div>
      <button type="submit" class="btn mt-3">Login</button>
      <div class="divider">Or</div>
      <div class="flex gap-x-4">
        <button type="button" class="btn grow">
          <Icon icon="bxl:apple" />
          Continue with Apple
        </button>
        <button type="button" class="btn grow">
          <Icon icon="bxl:google" />
          Continue with Google
        </button>
      </div>
      <p class="mt-3 text-center text-sm text-balance">
        By clicking continue, you agree to our
        <RouterLink to="#" class="link">Terms of Service</RouterLink> and
        <RouterLink to="#" class="link">Privacy Policy</RouterLink>
      </p>
    </form>
  </main>
</template>
