<script setup lang="ts">
import { defineProps } from "vue";

interface Props {
  score: {
    correct: number;
    wrong: number;
  };
}
const props = defineProps<Props>();
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-[3rem] bg-quizler-blue-3 w-full h-full rounded-[1rem] px-[12rem] py-[10rem]"
  >
    <p class="text-white text-[5rem] font-bold">結束測驗</p>
    <div class="flex items-center">
      <template v-if="props.score.wrong === 0">
        <p class="text-[2rem] font-bold text-emerald-300">恭喜答對所有題目！</p>
      </template>
      <template v-else>
        <p class="text-[2rem] font-bold text-emerald-300">
          共答對{{ props.score.correct }}題
        </p>

        <span class="text-white text-[2rem]">、</span>
        <p class="text-[2rem] font-bold text-red-400">
          答錯{{ props.score.wrong }}題
        </p>
      </template>
    </div>
  </div>
</template>
