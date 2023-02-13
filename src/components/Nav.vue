<script setup lang="ts">
import { auth, signOut } from "../includes/firebase";
import image from "../assets/index";
</script>

<template>
  <header
    :class="`bg-quizler-blue-2 border-b-[0.5px] border-white/50 px-[5rem] py-[2.5rem]`"
  >
    <!-- Nav -->
    <nav class="flex items-center justify-between">
      <!-- Left -->
      <div class="flex items-center justify-center gap-[2rem]">
        <a href="/library">
          <img
            class="w-[10rem] cursor-pointer"
            :src="image.logo_white"
            alt="Logo"
          />
        </a>
      </div>

      <!-- Right -->
      <div class="flex gap-[3rem] text-[1.8rem]">
        <button
          class="bg-quizler-purple px-[2rem] py-[0.8rem] rounded-[0.5rem] text-white transition-all duration-100 ease-linear hover:scale-105"
          type="button"
          @click="signOut(auth)"
        >
          登出
        </button>
      </div>
    </nav>
  </header>
</template>
