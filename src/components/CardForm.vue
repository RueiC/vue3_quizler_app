<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';
import type { Ref } from 'vue';
import type { FlashCard } from '../../types';

interface Props {
  flashCardContent: FlashCard;
  contentIndex: number;
  isEdit: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['setItems']);
const word: Ref<string> = ref(props.flashCardContent.word);
const definition: Ref<string> = ref(props.flashCardContent.definition);

watch([word, definition], ([newWord, newDefinition]) => {
  const inputValue = {
    word: newWord,
    definition: newDefinition,
    index: props.contentIndex,
  };

  emit('setItems', inputValue);
});
</script>

<template>
  <div
    class="flex items-center justify-between gap-[5rem] w-full f-full md:h-[8rem] rounded-[1rem] bg-quizler-blue-3 border-[0.5px] border-white px-[4rem] py-[2rem] md:py-0 border:opacity-10"
  >
    <span class="text-[2rem] text-white">{{ props.contentIndex + 1 }}</span>
    <div class="flex flex-col md:flex-row w-full gap-[3rem]">
      <template v-if="props.isEdit">
        <input
          class="w-full appearance-none bg-transparent py-[1rem] px-[1rem] leading-tight focus:outline-none border-b-[0.3px] border-white text-white placeholder:text-white placeholder:opacity-70"
          type="text"
          placeholder="詞語"
          v-model="word"
        />
        <input
          class="w-full appearance-none bg-transparent py-[1rem] px-[1rem] leading-tight focus:outline-none border-b-[0.3px] border-white text-white placeholder:text-white placeholder:opacity-70"
          type="text"
          placeholder="定義"
          v-model="definition"
        />
      </template>

      <template v-else>
        <p
          class="w-full text-[2rem] py-[1rem] px-[1rem] leading-tight text-white"
        >
          {{ props.flashCardContent.word }}
        </p>
        <p
          class="w-full text-[2rem] py-[1rem] px-[1rem] leading-tight text-white"
        >
          {{ props.flashCardContent.definition }}
        </p>
      </template>
    </div>
  </div>
</template>
