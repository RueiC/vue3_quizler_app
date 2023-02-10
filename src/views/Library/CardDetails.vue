<script setup lang="ts">
import { onBeforeMount, ref, reactive } from 'vue';
import { useStore } from 'vuex';
import type { Commit } from 'vuex';
import type { Ref } from 'vue';
// @ts-ignore
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import type { User } from '@firebase/auth';
import { useToast } from 'vue-toastification';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import type { FlashCard, ControlModal } from '../../../types';
import { CardForm, FlipCard, ConfirmModal } from '../../components/index';
import {
  auth,
  db,
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  onAuthStateChanged,
} from '../../includes/firebase';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const isEdit: Ref<boolean> = ref(false);
const index: Ref<number> = ref(1);
const items: FlashCard[] = reactive([]);
const isModalOpen: Ref<boolean> = ref(false);
const slideDirection: Ref<string> = ref('right');
const cardId: string = route.params.id as string;

const { commit, getters }: { commit: Commit; getters: any } = useStore();

interface Item {
  index: number;
  word: string;
  definition: string;
}

onBeforeMount(() => {
  commit('SHOW_SPINNER');

  onAuthStateChanged(auth, (user: User | null): void => {
    if (!user) return;
    getFlashcardContent(user);
  });
});

const setItems = (item: Item): void => {
  items[item.index].word = item.word;
  items[item.index].definition = item.definition;
};

const getFlashcardContent = async (user: User): Promise<void> => {
  try {
    const q = query(
      collection(db, 'library'),
      where('uid', '==', user.uid),
      where('id', '==', cardId),
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc): void => {
      if (doc.exists()) {
        items.push(...doc.data().flashcards);
      }
    });
  } catch (err) {
    console.log(err);
  }

  commit('HIDE_SPINNER');
};

const handleEdit = async (): Promise<void> => {
  const newItems = [...items];

  try {
    const docRef = doc(db, 'library', cardId as string);

    await updateDoc(docRef, {
      flashcards: newItems,
    });
  } catch (err) {
    console.log(err);
  }

  isEdit.value = false;
};

const nextCard = (): void => {
  if (index.value < items.length) {
    slideDirection.value = 'right';
    index.value += 1;
  }
};

const prevCard = (): void => {
  if (index.value > 1) {
    slideDirection.value = 'left';
    index.value -= 1;
  }
};

const deleteFlashCard = async (): Promise<void> => {
  if (!cardId) return;

  try {
    await deleteDoc(doc(db, 'library', cardId));

    toast.success('刪除成功');
    router.replace('/library');
  } catch (err) {
    console.log(err);
  }
};

const controlModalOpen = ({ toggle }: ControlModal): void => {
  isModalOpen.value = toggle;
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

  <ConfirmModal
    v-if="isModalOpen"
    :deleteFlashCard="deleteFlashCard"
    @controlModalOpen="controlModalOpen"
  />

  <main
    v-if="!getters.isShowSpinnder"
    class="flex flex-col gap-[12rem] bg-quizler-blue-2 w-full h-full px-[5rem] md:px-[15rem] lg:px-[20rem] xl:px-[30rem] py-[8.5rem]"
  >
    <div class="flex items-center justify-between w-full">
      <h1 class="text-[4rem] text-white font-bold">My Card</h1>
      <div
        class="flex items-center justify-center bg-white w-[5rem] h-[5rem] p-[1rem] rounded-full opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-200 ease-linear cursor-pointer"
        @click="isModalOpen = true"
      >
        <font-awesome-icon
          class="text-[2rem] opacity-80"
          icon="fa-solid fa-trash-can"
        />
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-[5rem] md-gap-0 justify-between">
      <div class="flex flex-col gap-[5rem] md:gap-0 justify-between">
        <div class="flex flex-col gap-[3rem] text-white text-[2rem]">
          <p>學習</p>
          <router-link :to="{ name: 'spell-mode' }">
            <div
              class="flex items-center gap-[1.5rem] cursor-pointer transition-all duration-100 ease-linear hover:scale-110"
            >
              <i class="fa-solid fa-spell-check"></i>
              <p>拼寫測試</p>
            </div>
          </router-link>
          <router-link :to="{ name: 'learn-mode' }">
            <div
              class="flex items-center gap-[1.5rem] cursor-pointer transition-all duration-100 ease-linear hover:scale-110"
            >
              <i class="fa-solid fa-graduation-cap"></i>
              <p>學習測試</p>
            </div>
          </router-link>
        </div>

        <button
          v-if="!isEdit"
          class="text-[2.5rem] px-[2.5rem] py-[1rem] bg-quizler-blue-1 text-white rounded-[1rem] transition-all duration-100 ease-linear hover:scale-105"
          type="button"
          @click="(): boolean => (isEdit = true)"
        >
          編輯
        </button>
        <button
          v-else
          class="text-[2.5rem] px-[2.5rem] py-[1rem] bg-quizler-blue-1 text-white rounded-[1rem] transition-all duration-100 ease-linear hover:scale-105"
          type="button"
          @click="handleEdit"
        >
          完成
        </button>
      </div>

      <div class="flex flex-col gap-[3rem]">
        <FlipCard
          :key="items[index - 1]?.id"
          :word="items[index - 1]?.word"
          :definition="items[index - 1]?.definition"
          :slideDirection="slideDirection"
        />
        <div
          class="flex items-center justify-center gap-[5rem] text-white text-[1.5rem]"
        >
          <i
            class="fa-solid fa-left-long cursor-pointer transition-all duration-100 ease-linear hover:scale-110"
            @click="prevCard"
          ></i>
          <span>{{ `${index}/${items?.length}` }}</span>
          <i
            class="fa-solid fa-right-long cursor-pointer transition-all duration-100 ease-linear hover:scale-110"
            @click="nextCard"
          ></i>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-[2.5rem] text-white font-bold mb-[5rem]">
        學習中的詞語 <span>（{{ items.length }}）</span>
      </h2>

      <div class="flex flex-col gap-[3rem]">
        <CardForm
          v-for="(item, index) in items"
          :key="item.id"
          :content="item"
          :index="index"
          :isEdit="isEdit"
          @setItems="setItems"
        />
      </div>
    </div>
  </main>
</template>
