<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { defineProps, ref } from "vue";
import type { Ref } from "vue";
import type { FlashcardSet } from "../../types";
import { RouterLink } from "vue-router";

interface Props {
  flashcardSet: FlashcardSet;
}

const props = defineProps<Props>();
const onHovered: Ref<boolean> = ref(false);
</script>

<template>
  <div
    class="relative w-full h-[20rem] opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-200 ease-linear cursor-pointer"
    @mouseenter="onHovered = true"
    @mouseleave="onHovered = false"
  >
    <router-link
      :to="{ name: 'flash-card', params: { id: props.flashcardSet.id } }"
    >
      <div
        class="flex items-center justify-center bg-blue-200 w-full h-full rounded-[1rem]"
      >
        <p class="text-[2rem] font-medium">{{ props.flashcardSet.title }}</p>
      </div>
    </router-link>

    <div
      v-show="onHovered"
      class="absolute top-[2rem] right-[2rem] flex items-center justify-center bg-white w-[5rem] h-[5rem] p-[1rem] rounded-full opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-200 ease-linear"
      @click="
        $emit('controlModalOpen', { toggle: true, id: props.flashcardSet.id })
      "
    >
      <font-awesome-icon
        class="text-[2rem] opacity-80"
        icon="fa-solid fa-trash-can"
      />
    </div>
  </div>
</template>
