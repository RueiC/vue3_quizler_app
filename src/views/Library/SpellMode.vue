<script setup lang="ts">
import { ref, reactive, onBeforeMount } from 'vue';
import type { Ref } from 'vue';
import type { User } from '@firebase/auth';
import type { Commit } from 'vuex';
import type { FlashCard } from '../../../types';
import { useRoute, useRouter } from 'vue-router';
// @ts-ignore
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import { useStore } from 'vuex';

import { FinishedQuizeWindow } from '../../components/index';
import {
  auth,
  db,
  getDoc,
  doc,
  onAuthStateChanged,
} from '../../includes/firebase';

interface Score {
  correct: number;
  wrong: number;
}

const router = useRouter();
const route = useRoute();
const questionSets: Ref<FlashCard[]> = ref([]);
const inputAnswer: Ref<string> = ref('');
const currentSequence: Ref<number> = ref(0);
const isCorrect = reactive({
  msg: '你的答案',
  optionColor: 'border-white text-white',
  disabledInput: false,
});
const score: Score = reactive({ correct: 0, wrong: 0 });
const cardId: string = route.params.id as string;
const { commit, getters }: { commit: Commit; getters: any } = useStore();
const vInputState = {
  mounted: (inputEl: any) => inputEl.focus(),
  updated: (inputEl: any, binding: any) => {
    const isDisabled = binding.value;

    if (isDisabled) {
      inputEl.disabled = isDisabled;
    } else {
      inputEl.disabled = isDisabled;
      inputEl.focus();
    }
  },
};

onBeforeMount(() => {
  commit('SHOW_SPINNER');
  onAuthStateChanged(auth, (user: User | null): void => {
    if (!user) return;

    getFlashcardContent();
  });
});

const getFlashcardContent = async (): Promise<void> => {
  try {
    const docRef = doc(db, 'library', cardId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return;

    const { flashcards } = docSnap.data();
    questionSets.value = flashcards;
  } catch (err) {
    console.log(err);
  }

  commit('HIDE_SPINNER');
};

const responseMsg = (correct: boolean): void => {
  isCorrect.disabledInput = true;

  if (correct) {
    isCorrect.msg = '答對了！';
    isCorrect.optionColor = 'border-green-300 text-green-300';

    score.correct += 1;
  }
  if (!correct) {
    isCorrect.msg = '加油！很接近了';
    isCorrect.optionColor = 'border-red-400 text-red-400';
    score.wrong += 1;
  }
};

const nextQuestion = (isFinish: boolean): void => {
  if (!isFinish) {
    setTimeout(() => {
      inputAnswer.value = '';
      currentSequence.value += 1;
      isCorrect.optionColor = 'border-white text-white';
      isCorrect.msg = '你的答案';
      isCorrect.disabledInput = false;
    }, 2000);
  } else {
    setTimeout(() => {
      questionSets.value.length = 0;
      currentSequence.value += 1;
      inputAnswer.value = '';
      isCorrect.disabledInput = false;

      setTimeout(() => {
        router.push({ name: 'flash-card', params: { cardId } });
      }, 2000);
    }, 2500);
  }
};

const checkAnswer = (currentQuestion: FlashCard, sequence: number): void => {
  const isFinish = sequence === questionSets.value.length - 1;
  const correct = true;
  const wrong = false;

  if (inputAnswer.value === currentQuestion.word) {
    responseMsg(correct);
  } else {
    responseMsg(wrong);
  }

  nextQuestion(isFinish);
};
</script>

<template>
  <div
    v-if="getters.isShowSpinnder"
    class="flex items-center justify-center w-screen h-screen"
  >
    <clip-loader
      class="flex items-center justify-center w-screen h-screen bg-quizler-blue-2"
      :size="'100px'"
    />
  </div>

  <main
    v-if="!getters.isShowSpinnder"
    class="flex items-center justify-center bg-quizler-blue-2 w-full h-[100vh]"
  >
    <div
      class="w-full px-[3rem] sm:px-0 sm:w-[70%] h-[50%] flex items-center justify-center"
    >
      <div
        v-if="currentSequence < questionSets.length"
        class="flex flex-col items-center justify-between bg-quizler-blue-3 w-full h-full rounded-[1rem] px-[5rem] sm:px-[12rem] py-[10rem]"
      >
        <p class="text-white text-[3rem] font-medium">
          {{ questionSets[currentSequence].definition }}
        </p>

        <div class="w-full">
          <p class="text-white text-[2.2rem] font-medium mb-[5rem]">
            {{ isCorrect.msg }}
          </p>

          <form
            @submit.prevent="
              checkAnswer(questionSets[currentSequence], currentSequence)
            "
          >
            <input
              :class="`${isCorrect.optionColor} w-full rounded-[0.3rem] appearance-none bg-transparent py-[1rem] leading-tight focus:outline-none border-b-[0.3px] placeholder:text-white placeholder:opacity-70 text-[2rem]`"
              type="text"
              placeholder="你的答案"
              v-model="inputAnswer"
              v-input-state="isCorrect.disabledInput"
              autocomplete="off"
            />
          </form>
        </div>
      </div>

      <FinishedQuizeWindow v-else :score="score" />
    </div>
  </main>
</template>
