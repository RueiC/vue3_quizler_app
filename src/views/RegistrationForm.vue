<script setup lang="ts">
import { useStore } from 'vuex';
import image from '../assets/index';
import { SignInForm, SignUpForm } from '../components/index';

const { getters }: { getters: any } = useStore();
</script>

<template>
  <!-- Desktop -->
  <div class="fixed top-0 left-0 bg-black/5 w-full h-[100vh]" />

  <div
    class="hidden md:flex items-center justify-center md:fixed top-0 left-0 w-full h-[100vh] z-50"
  >
    <div
      class="flex items-center justify-between w-[121rem] h-[76rem] rounded-[3rem] bg-white shadow-xl"
    >
      <SignInForm :type="'desktop'" />
      <SignUpForm :type="'desktop'" />

      <div
        :class="`absolute flex items-center justify-center w-[60.5rem] h-[76rem] transition-all duration-500 ease-in-out ${
          getters.inSignInForm && 'translate-x-[100%]'
        }`"
      >
        <img :src="image.effect_2" alt="" />
      </div>
    </div>
  </div>

  <!-- Mobile -->
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
