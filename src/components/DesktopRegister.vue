<script setup lang="ts">
import { useStore } from 'vuex';
import image from '../assets/index';
import { SignInForm, SignUpForm } from './index';

const { getters }: { getters: any } = useStore();
</script>

<template>
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
          getters.inSignInForm ? 'translate-x-[100%]' : ''
        }`"
      >
        <img :src="image.effect_2" alt="image" />
      </div>
    </div>
  </div>
</template>
