<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { Ref } from 'vue';
import type { User } from '@firebase/auth';
import type { FlashCard } from '../../../types';
import type { Router } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';

import { CardForm } from '../../components/index';
import { db, auth, doc, setDoc } from '../../includes/firebase';

interface Item {
  index: number;
  word: string;
  definition: string;
}

const toast = useToast();
const router: Router = useRouter();
const flashCardTitle: Ref<string> = ref('');
const createdItems: FlashCard[] = reactive([
  {
    id: uuidv4(),
    word: '',
    definition: '',
  },
]);
const inputState = reactive({
  style: 'bg-quizler-blue-1',
  text: '建立學習集',
  status: 'none',
});

const setItems = (item: Item): void => {
  createdItems[item.index].word = item.word;
  createdItems[item.index].definition = item.definition;
};

const addRow = (): void => {
  const newItem = {
    id: uuidv4(),
    word: '',
    definition: '',
  };

  createdItems.push(newItem);
};

const clearFields = (): void => {
  flashCardTitle.value = '';
  createdItems.length = 0;
};

const upload = async (title: string): Promise<void> => {
  const user: User | null = auth.currentUser;

  if (!user) {
    toast.error('新增失敗');
    return;
  }

  inputState.style = 'bg-gray-300';
  inputState.text = '建立中';
  inputState.status = 'loading';

  const docId: string = uuidv4();

  const newItem = createdItems.filter(
    (item: FlashCard): boolean => item.word !== '' && item.definition !== '',
  );

  try {
    const docItem = {
      id: docId,
      uid: user.uid,
      title: title,
      flashcards: newItem,
    };

    await setDoc(doc(db, 'library', docId), docItem);

    toast.success('成功新增學習集');

    router.replace('/library');
  } catch (err) {
    console.log(err);
  }

  inputState.style = 'bg-quizler-blue-1';
  inputState.text = '建立';
  inputState.status = 'none';
  clearFields();
};
</script>

<template>
  <main
    class="flex flex-col gap-[5rem] h-[100vh] bg-quizler-blue-2 px-[5rem] md:px-[12rem] lg:px-[22rem] py-[8.5rem]"
  >
    <h1 class="text-[4rem] text-white font-bold">建立學習集</h1>

    <input
      class="appearance-none bg-transparent text-[2rem] w-full md:w-[60rem] py-[2rem] leading-tight focus:outline-none border-b-[0.5px] border-white text-white placeholder:text-white placeholder:opacity-60"
      type="text"
      placeholder="輸入標題，像是「第一課單字」"
      v-model="flashCardTitle"
    />

    <div class="flex flex-col gap-[2rem]">
      <CardForm
        v-for="(createdItem, i) in createdItems"
        :key="createdItem.id"
        :flashCardContent="createdItem"
        :isEdit="true"
        :contentIndex="i"
        @setItems="setItems"
      />
    </div>
    <div class="flex items-center justify-center">
      <i
        class="fa-solid fa-circle-plus flex items-center justify-center text-[5rem] bg-white rounded-full text-quizler-blue-1 cursor-pointer transition-all duration-100 ease-linear hover:scale-110"
        @click="addRow"
      />
    </div>
    <button
      :class="`text-[2rem] px-[2rem] py-[1rem] text-white rounded-[1rem] cursor-pointer transition-all duration-100 ease-linear hover:scale-105 ${inputState.style}`"
      :disabled="inputState.status === 'loading' ? true : false"
      @click="upload(flashCardTitle)"
    >
      {{ inputState.text }}
    </button>
  </main>
</template>
