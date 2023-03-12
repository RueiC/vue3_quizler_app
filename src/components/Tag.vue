<script setup lang="ts">
import { defineProps } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

interface Props {
  tag: string;
  removeTag: (removedTag: string) => void;
}

const props = defineProps<Props>();
</script>

<template>
  <li
    class="flex items-center justify-center gap-[1rem] text-[1.6rem] bg-white/40 px-[1.3rem] py-[0.5rem] rounded-[1rem] hover:scale-105 transition-all duration-300 cursor-pointer"
    @click="() => removeTag(props.tag)"
  >
    <span>{{ props.tag }}</span>
    <font-awesome-icon class="text-[1.6rem]" icon="fa-solid fa-circle-xmark" />
  </li>
</template>
