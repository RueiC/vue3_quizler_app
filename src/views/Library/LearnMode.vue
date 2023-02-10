<script setup lang="ts">
import { ref, reactive, onBeforeMount } from "vue";
import type { Ref } from "vue";
import type { Commit } from "vuex";
import type { User } from "@firebase/auth";
import type { FlashCard } from "../../../types";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

import { QuizCard, FinishedQuizeWindow } from "../../components/index";
import {
  auth,
  db,
  doc,
  getDoc,
  onAuthStateChanged,
} from "../../includes/firebase";

interface QuizeState {
  score: {
    correct: number;
    wrong: number;
  };
  optionsState: {
    rightOption: number | null;
    wrongOption: number | null;
  };
  disabledOption: boolean;
}

const questions: Ref<FlashCard[]> = ref([]);
const questionOptions: FlashCard[] = reactive([]);
const currentSequence: Ref<number> = ref(0);
const answer: Ref<number | null> = ref(null);
const quizeState: QuizeState = reactive({
  score: { correct: 0, wrong: 0 },
  optionsState: { rightOption: null, wrongOption: null },
  disabledOption: false,
});
const router = useRouter();
const route = useRoute();
const cardId: string = route.params.id as string;
const { commit, getters }: { commit: Commit; getters: any } = useStore();

onBeforeMount(() => {
  commit("SHOW_SPINNER");
  onAuthStateChanged(auth, (user: User | null): void => {
    if (!user) return;

    getFlashcardContent();
  });
});

const getFlashcardContent = async (): Promise<void> => {
  try {
    const docRef = doc(db, "library", cardId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { flashcards } = docSnap.data();
      questions.value = flashcards;
    }

    createAnswer();
  } catch (err) {
    console.log(err);
  }

  commit("HIDE_SPINNER");
};

const createAnswer = (): void => {
  if (!questions.value || questions.value?.length === 0) return;

  const question = questions.value[currentSequence.value];
  const arr: FlashCard[] = [];
  const optionLength = questions.value.length > 4 ? 4 : questions.value.length;

  for (let step = 0; step < optionLength; step++) {
    const randomItem: FlashCard =
      questions.value[Math.floor(Math.random() * questions.value.length)];

    if (!arr.includes(randomItem)) {
      arr.push(randomItem);
    } else {
      step = step - 1;
    }
  }

  if (arr.includes(question)) {
    answer.value = arr.indexOf(question);
    questionOptions.push(...arr);
  } else {
    answer.value = Math.floor(Math.random() * questions.value.length);

    arr[answer.value] = question;
    questionOptions.push(...arr);
  }
};

const nextQuestion = (isFinish: boolean): void => {
  if (isFinish) {
    setTimeout((): void => {
      questions.value.length = 0;
      questionOptions.length = 0;
      currentSequence.value = 0;
      answer.value = null;
      quizeState.score.correct = 0;
      quizeState.score.wrong = 0;
      router.push({ name: "flash-card", params: { cardId } });
    }, 2000);
  }

  if (!isFinish) {
    setTimeout(() => {
      currentSequence.value += 1;
      questionOptions.length = 0;
      answer.value = null;
      quizeState.optionsState.rightOption = null;
      quizeState.optionsState.wrongOption = null;
      quizeState.disabledOption = false;
      createAnswer();
    }, 2000);
  }
};

const checkAnswer = (optionNum: number) => {
  const isCorrect = answer.value === optionNum ? true : false;
  const isFinish =
    currentSequence.value < questions.value.length ? false : true;
  quizeState.disabledOption = true;

  if (isCorrect) {
    quizeState.optionsState.rightOption = optionNum;
    quizeState.score.correct += 1;
  } else {
    quizeState.optionsState.rightOption = answer.value;
    quizeState.optionsState.wrongOption = optionNum;
    quizeState.score.wrong += 1;
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
    v-else
    class="flex items-center justify-center bg-quizler-blue-2 w-full h-[100vh]"
  >
    <div
      class="w-full px-[3rem] sm:px-0 sm:w-[70%] h-[50%] flex items-center justify-center"
    >
      <div
        v-if="currentSequence < questions.length"
        class="flex flex-col items-center justify-between bg-quizler-blue-3 w-full h-full rounded-[1rem] px-[5rem] sm:px-[12rem] py-[10rem]"
      >
        <p class="text-white text-[3rem] font-medium">
          {{ questions[currentSequence].definition }}
        </p>

        <div class="w-full">
          <p class="text-white text-[2.2rem] font-medium mb-[5rem]">
            選擇正確的詞語
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-[3rem]">
            <QuizCard
              v-for="(questionOption, i) in questionOptions"
              :key="i"
              :questionOption="questionOption"
              :quizeState="quizeState"
              :optionNum="i"
              @checkAnswer="checkAnswer"
            />
          </div>
        </div>
      </div>

      <FinishedQuizeWindow v-else :score="quizeState.score" />
    </div>
  </main>
</template>
