<script setup lang="ts">
import { defineProps } from "vue";

import image from "../assets/index";

interface Props {
  slide: {
    author: string;
    content: string;
    position: string;
  };
}

const props = defineProps<Props>();
</script>

<template>
  <div
    class="relative flex flex-col gap-[2rem] items-center justify-center w-full h-[25rem] p-[5rem] mt-[10rem] mb-[5rem] bg-white shadow-lg rounded-[1rem] transition-all duration-100 ease-linear hover:scale-105"
  >
    <div
      class="absolute -top-[5rem] bg-yellow-200 rounded-full w-[10rem] h-[10rem]"
    >
      <img :src="image.effect_2" alt="" />
    </div>
    <p class="mt-[4rem] text-[1.6rem] text-black/80">
      {{ props.slide.content }}
    </p>
    <div>
      <p class="text-black/80 font-medium text-[1.6rem]">
        {{ props.slide.author }}
      </p>
      <p class="text-black/50 font-medium">{{ props.slide.position }}</p>
    </div>
  </div>
</template>
