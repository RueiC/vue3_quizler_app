<script setup lang="ts">
import { defineProps, watch, ref, type Ref } from 'vue';

interface Props {
  optionNum: number;
  quizeState: {
    score: {
      correct: number;
      wrong: number;
    };
    optionsState: {
      rightOption: number | null;
      wrongOption: number | null;
    };
    disabledOption: boolean;
  };
  questionOption: {
    word: string;
    definition: string;
  };
}

const props = defineProps<Props>();
const emit = defineEmits(['checkAnswer']);
const defaultStyle = 'bg-quizler-blue-3 text-white';
const correctStyle = 'bg-green-400';
const wrongStyle = 'bg-red-400';

const optionStyle: Ref<string> = ref(defaultStyle);

watch(props.quizeState, (state) => {
  optionStyle.value = handleOptionStyle(state, props.optionNum);
});

const handleOptionStyle = (quizeState: any, optionNum: number): string => {
  let style = '';
  const rightOption = quizeState?.optionsState?.rightOption;
  const wrongOption = quizeState?.optionsState?.wrongOption;

  if (rightOption === optionNum) {
    style = correctStyle;
  } else if (wrongOption === optionNum) {
    style = wrongStyle;
  } else {
    style = defaultStyle;
  }

  return style;
};

const handleCheckAnswer = (isDisabled: boolean): void => {
  if (isDisabled) return;

  emit('checkAnswer', props.optionNum);
};
</script>

<template>
  <div
    :class="`${optionStyle} ${
      props.quizeState.disabledOption
        ? 'cursor-default'
        : 'hover:bg-white hover:text-black cursor-pointer'
    } flex items-center w-full gap-[2.5rem] rounded-[1rem] text-white text-[1.8rem] border-[0.5px] border-white px-[3rem] py-[2rem] border:opacity-10 cursor-pointer transition-all duration-100 ease-linear`"
    @click="() => handleCheckAnswer(props.quizeState.disabledOption)"
  >
    <span>{{ props.optionNum + 1 }}</span>
    <p>{{ props.questionOption.word }}</p>
  </div>
</template>
