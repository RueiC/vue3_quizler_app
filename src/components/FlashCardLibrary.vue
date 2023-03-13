<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { defineProps, ref } from 'vue';
import type { Ref } from 'vue';
import type { FlashcardSet } from '../../types';
import { RouterLink } from 'vue-router';

interface Props {
  flashcardSet: FlashcardSet;
}

const props = defineProps<Props>();
const onHovered: Ref<boolean> = ref(false);
</script>

<template>
  <div
    class="relative w-full h-full opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-200 ease-linear cursor-pointer"
    @mouseenter="onHovered = true"
    @mouseleave="onHovered = false"
  >
    <router-link
      :to="{ name: 'flash-card', params: { id: props.flashcardSet.id } }"
    >
      <div
        class="flex flex-col justify-between gap-[0.5rem] items-start bg-quizler-blue-3 w-full h-full rounded-[1rem] px-[3rem] py-[2.5rem]"
      >
        <div>
          <p class="text-[2.2rem] font-medium text-white">
            {{ props.flashcardSet.title }}
          </p>
          <p class="text-[1.7rem] text-white/70">
            {{ props.flashcardSet.flashcards.length }}個詞語
          </p>
        </div>

        <div class="flex items-center gap-[1rem] text-[1.6rem]">
          <span class="px-[1.2rem] py-[0.6rem] bg-white/80 rounded-full"
            >tag-1</span
          >
          <span class="px-[1.2rem] py-[0.6rem] bg-white/80 rounded-full"
            >tag-2</span
          >
        </div>
      </div>
    </router-link>

    <div
      v-show="onHovered"
      class="absolute bottom-[2.5rem] right-[2.5rem] flex items-center justify-center bg-white w-[4rem] h-[4rem] p-[1rem] rounded-full opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-200 ease-linear"
      @click="
        $emit('controlModalOpen', { toggle: true, id: props.flashcardSet.id })
      "
    >
      <font-awesome-icon
        class="text-[1.7rem] opacity-80"
        icon="fa-solid fa-trash-can"
      />
    </div>
  </div>
</template>
