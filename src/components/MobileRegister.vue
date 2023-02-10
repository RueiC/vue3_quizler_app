<script setup lang="ts">
import { SignInForm, SignUpForm } from './index';
</script>

<template>
  <div
    class="fixed top-0 left-0 w-[100%] h-full z-50 overflow-hidden md:hidden"
  >
    <div class="relative flex items-center justify-between w-[200%] h-full">
      <div
        className="flex items-center justify-between w-[200%] h-full bg-white"
      >
        <SignInForm :type="'mobile'" />
        <SignUpForm :type="'mobile'" />
      </div>
    </div>
  </div>
</template>
