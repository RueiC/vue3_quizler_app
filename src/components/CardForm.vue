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
    class="flex items-center justify-between gap-[5rem] w-full f-full md:h-[8rem] rounded-[1rem] bg-quizler-blue-3/50 px-[4rem] py-[2rem] md:py-0 border-l-[3px] border-orange-300/70"
  >
    <div
      class="flex flex-col items-center md:flex-row w-full h-full gap-[3rem]"
    >
      <template v-if="props.isEdit">
        <input
          class="w-[40%] appearance-none bg-transparent py-[1rem] px-[1rem] leading-tight focus:outline-none border-b-[0.3px] border-white text-white placeholder:text-white placeholder:opacity-70"
          type="text"
          placeholder="詞語"
          v-model="word"
        />
        <div class="border-l-[1.5px] h-[70%] border-black/40" />
        <input
          class="w-full appearance-none bg-transparent py-[1rem] px-[1rem] leading-tight focus:outline-none border-b-[0.3px] border-white text-white placeholder:text-white placeholder:opacity-70"
          type="text"
          placeholder="定義"
          v-model="definition"
        />
      </template>

      <template v-else>
        <p
          class="w-[40%] text-[2.5rem] py-[1rem] px-[1rem] leading-tight text-white"
        >
          {{ props.flashCardContent.word }}
        </p>
        <div class="border-l-[1.5px] h-[70%] border-black/40" />
        <div
          class="flex items-center justify-between w-full text-[2.5rem] py-[1rem] px-[1rem] leading-tight text-white"
        >
          <p>
            {{ props.flashCardContent.definition }}
          </p>
          <div class="flex items-center gap-[2.5rem]">
            <i
              class="fa-regular fa-star hover:scale-110 duration-300 transition-all cursor-pointer hover:opacity-70"
            ></i>
            <i
              class="fa-solid fa-pen hover:scale-110 duration-300 transition-all cursor-pointer hover:opacity-70"
            ></i>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
