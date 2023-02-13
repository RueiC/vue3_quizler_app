<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import type { Ref } from "vue";
import { useRouter, useRoute, RouterView } from "vue-router";
import type { User } from "@firebase/auth";

import { auth } from "./includes/firebase";
import { Nav } from "./components/index";

const currentUser: Ref<User | null> = ref(null);
const isPageReady: Ref<boolean> = ref(false);
const router = useRouter();
const route = useRoute();

const checkUser = (user: User | null): void => {
  if (user) {
    currentUser.value = user;

    if (document?.querySelector("html") !== null) {
      document!.querySelector("html")!.style.backgroundColor = "#353A65";
    }
  }
  if (!user) {
    currentUser.value = null;

    if (document?.querySelector("html") !== null) {
      document!.querySelector("html")!.style.backgroundColor = "#ffffff";
    }
  }

  isPageReady.value = true;
};

const checkIsLoggedIn = (user: User | null): void => {
  if (!user && route.path !== "/") {
    router.replace("/");
  }
  if (user && route.path === "/") {
    router.replace("/library");
  }
};

onBeforeMount(() => {
  auth.onAuthStateChanged((user: User | null): void => {
    checkUser(user);
    checkIsLoggedIn(user);
  });
});
</script>

<template>
  <div v-if="isPageReady">
    <Nav v-if="route.path !== '/'" :currentUser="currentUser" />
    <RouterView />
  </div>
</template>

<style>
html {
  background-color: #ffffff;
}
</style>
