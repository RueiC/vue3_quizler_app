<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import type { Ref } from "vue";
import type { ControlModal } from "../../../types";
import type { Commit } from "vuex";
import type { DocumentData } from "@firebase/firestore";
import { useStore } from "vuex";
import { RouterLink, useRouter } from "vue-router";
// @ts-ignore
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import type { User } from "@firebase/auth";
import { useToast } from "vue-toastification";

import {
  db,
  auth,
  onAuthStateChanged,
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "../../includes/firebase";
import { FlashCardLibrary, ConfirmModal } from "../../components/index";

const { commit, getters }: { commit: Commit; getters: any } = useStore();
const flashcardSets: DocumentData = ref([]);
const isModalOpen: Ref<boolean> = ref(false);
const confirmedDeleteId: Ref<string> = ref("");
const firebaseUser: Ref<User | null> = ref(null);
const router = useRouter();
const toast = useToast();

onBeforeMount(() => {
  commit("SHOW_SPINNER");

  onAuthStateChanged(auth, (user: User | null): void => {
    if (!user) router.replace("/");

    firebaseUser.value = user;
    getLibrary(user);
  });
});

const getLibrary = async (user: User | null): Promise<void> => {
  if (!user) return;

  try {
    const q = query(collection(db, "library"), where("uid", "==", user?.uid));

    const querySnapshot = await getDocs(q);
    flashcardSets.value.length = 0;

    querySnapshot.forEach((doc: DocumentData): void => {
      if (!doc.exists()) return;

      const item = doc.data();
      flashcardSets.value.push(item);
    });
  } catch (err) {
    console.log(err);
  }
  commit("HIDE_SPINNER");
};

const deleteFlashCard = async (): Promise<void> => {
  isModalOpen.value = false;
  if (confirmedDeleteId.value === "") return;

  try {
    await deleteDoc(doc(db, "library", confirmedDeleteId.value));

    confirmedDeleteId.value = "";
    getLibrary(firebaseUser.value);
    toast.success("刪除成功");
  } catch (err) {
    console.log(err);
  }
};

const controlModalOpen = ({ toggle, id }: ControlModal): void => {
  confirmedDeleteId.value = id;
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

  <main
    v-if="!getters.isShowSpinnder"
    class="bg-quizler-blue-2 px-[5rem] md:px-[15rem] lg:px-[20rem] py-[5rem] h-[100vh]"
  >
    <h1 class="text-[4rem] text-white font-bold mb-[5rem]">你的學習集</h1>

    <div
      class="grid grid-cols-1 ss:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-[3rem]"
    >
      <router-link :to="{ name: 'create-set' }">
        <div
          class="flex items-center justify-center w-full h-[20rem] bg-black-gradient cursor-pointer transition-all duration-100 ease-linear hover:scale-105 rounded-[1rem]"
        >
          <i
            class="fa-solid fa-circle-plus text-quizler-blue-1 text-[3.5rem] bg-white rounded-full z-10"
          ></i>
        </div>
      </router-link>

      <template v-if="flashcardSets.length !== 0">
        <FlashCardLibrary
          v-for="flashcardSet in flashcardSets"
          :key="flashcardSet.id"
          :flashcardSet="flashcardSet"
          @controlModalOpen="controlModalOpen"
        />
      </template>
    </div>
  </main>

  <ConfirmModal
    v-if="isModalOpen"
    :deleteFlashCard="deleteFlashCard"
    @controlModalOpen="controlModalOpen"
  />
</template>
