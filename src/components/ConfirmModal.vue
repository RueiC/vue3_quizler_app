<script setup lang="ts">
import { Motion, Presence } from "motion/vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface Props {
  deleteFlashCard: () => {};
}

const props = defineProps<Props>();
</script>

<template>
  <div class="fixed top-0 left-0 bg-black/50 w-full h-[100vh]" />

  <Presence>
    <motion
      class="flex items-center justify-center fixed top-0 left-0 w-full h-[100vh] z-50"
      :initial="{ opacity: 0, scale: 0.5 }"
      :animate="{ opacity: 1, scale: 1 }"
      :exit="{ opacity: 0, scale: 0.6 }"
    >
      <div
        class="relative flex items-center justify-center w-[40rem] h-[23rem]"
      >
        <div
          class="absolute -top-[4.5rem] flex items-center justify-center bg-white p-[1.5rem] rounded-full z-10"
        >
          <font-awesome-icon
            class="text-[7rem] text-yellow-400"
            icon="fa-solid fa-circle-exclamation"
          />
        </div>

        <div
          class="relative w-full h-full flex flex-col items-center justify-center gap-[4rem] rounded-[1.5rem] bg-white overflow-hidden"
        >
          <div class="flex flex-col items-center justify-center mb-[2.5rem]">
            <p class="text-[2.5rem] font-normal opacity-80">確定要刪除嗎?</p>
            <p class="text-[1.6rem] opacity-70">一旦刪除後就無法復原</p>
          </div>

          <div
            class="absolute bottom-0 w-full flex items-center justify-between"
          >
            <button
              class="bg-red-500 px-[2rem] py-[1.5rem] w-full text-white opacity-100 hover:opacity-80 transition-all duration-200 ease-linear"
              @click="props.deleteFlashCard"
            >
              刪除
            </button>
            <button
              class="bg-gray-400 px-[2rem] py-[1.5rem] w-full text-white opacity-100 hover:opacity-80 transition-all duration-200 ease-linear"
              @click="$emit('controlModalOpen', { toggle: false, id: '' })"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </motion>
  </Presence>
</template>
