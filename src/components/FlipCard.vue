<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";

interface Props {
  word: string;
  definition: string;
  slideDirection: string;
}

const props = defineProps<Props>();
const isRotate: Ref<boolean> = ref(false);
</script>

<template>
  <div
    class="perspective-100 w-full md:w-[60rem] h-[35rem]"
    @click="isRotate = !isRotate"
  >
    <div
      :class="`relative w-full h-full cursor-pointer preserve-3d ${
        isRotate && 'rotate-y-180'
      }`"
    >
      <div
        class="flex items-center justify-center absolute w-full h-full overflow-hidden rounded-[1rem] text-white text-[4rem] font-bold backface-visibility-hidden bg-quizler-blue-3/50"
      >
        <h2>{{ props.word }}</h2>
      </div>

      <div
        class="absolute flex items-center justify-center w-full h-full overflow-hidden rounded-[1rem] text-white text-[4rem] font-bold rotate-y-180 backface-visibility-hidden bg-quizler-blue-3/50"
      >
        <h2>{{ props.definition }}</h2>
      </div>
    </div>
  </div>
</template>

<style>
.perspective-100 {
  perspective: 1000px;
}

.preserve-3d {
  transition: transform 1s;
  transform-style: preserve-3d;
}

.backface-visibility-hidden {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  box-shadow: 0px 3px 18px 3px rgba(0, 0, 0, 0.2);
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
