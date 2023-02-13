<script setup lang="ts">
import { useStore } from "vuex";
import type { Commit } from "vuex";
import type { FieldMeta } from "vee-validate";
import type { UserCredential } from "@firebase/auth";
import { useField, useForm } from "vee-validate";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "../includes/firebase";
import image from "../assets/index";
import { schema } from "../includes/validator";
import { reactive } from "vue";

interface Props {
  type: string;
}

interface InputString {
  value: string;
  meta: FieldMeta<any>;
  errorMessage: string;
  handleBlur: () => void;
  handleChange: () => void;
}

const props = defineProps<Props>();
const { commit, getters }: { commit: Commit; getters: any } = useStore();
const { handleSubmit } = useForm<Record<string, any>>({
  validationSchema: schema,
});
const inputState = reactive({
  style: "bg-quizler-blue-1",
  text: "註冊",
  status: "none",
});

const {
  value: name,
  meta: nameMeta,
  errorMessage: nameErrorMessage,
  handleBlur: handleNameBlur,
  handleChange: handleNameChange,
} = useField<InputString>("name");

const {
  value: email,
  meta: emailMeta,
  errorMessage: emailErrorMessage,
  handleBlur: handleEmailBlur,
  handleChange: handleEmailChange,
} = useField<InputString>("email");

const {
  value: password,
  meta: passwordMeta,
  errorMessage: passwordErrorMessage,
  handleBlur: handlePasswordBlur,
  handleChange: handlePasswordChange,
} = useField<InputString>("password");

const signUp = handleSubmit<Promise<void>>(
  async (values, actions): Promise<void> => {
    inputState.style = "bg-gray-300";
    inputState.text = "處理中";
    inputState.status = "loading";

    try {
      await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      ).then(async (userCredential: UserCredential): Promise<void> => {
        if (!userCredential) return;

        await updateProfile(userCredential.user, {
          displayName: values.name,
        }).then(() => {
          actions.resetForm();
          commit("TOGGLE_FORM_TYPE");
        });
      });
    } catch (err) {
      console.log(err);
    }

    inputState.style = "bg-quizler-blue-1";
    inputState.text = "註冊";
    inputState.status = "none";
  }
);
</script>

<template>
  <form
    v-if="props.type !== 'mobile'"
    :class="`flex flex-col gap-[5rem] w-full px-[9.6rem] py-[6rem] transition-all duration-500 ease-in-out opacity-100 ${
      getters.inSignInForm &&
      '-translate-x-[100%] opacity-0 pointer-events-none'
    }`"
    novalidate
    @submit.prevent="signUp"
  >
    <img class="w-[13.2rem]" :src="image.logo_blue" alt="logo" />

    <div class="text-black">
      <p class="text-[3.5rem] font-bold mb-[1.5rem]">註冊</p>
      <p>
        <span class="opacity-50">已經註冊了嗎？ </span>
        <span class="cursor-pointer" @click="commit('SET_FORM_TYPE_TO_SIGNIN')">
          登入
        </span>
      </p>
    </div>

    <div v-show="!getters.inSignInForm" class="flex flex-col gap-[3rem]">
      <div>
        <input
          class="appearance-none bg-transparent w-full py-[1rem] px-[1rem] leading-tight focus:outline-none border-b-[0.5px] border-black text-black placeholder:text-black mb-[1rem]"
          type="text"
          placeholder="暱稱"
          @input="handleNameChange"
          @blur="handleNameBlur"
          :value="name"
        />
        <p v-show="nameMeta.touched && !nameMeta.valid" class="text-red-500">
          {{ nameErrorMessage }}
        </p>
      </div>
      <div>
        <input
          class="appearance-none bg-transparent w-full py-[1rem] px-[1rem] leading-tight focus:outline-none border-b-[0.5px] border-black text-black placeholder:text-black mb-[1rem]"
          type="email"
          placeholder="帳號"
          @input="handleEmailChange"
          @blur="handleEmailBlur"
          :value="email"
        />
        <p v-show="emailMeta.touched && !emailMeta.valid" class="text-red-500">
          {{ emailErrorMessage }}
        </p>
      </div>
      <div>
        <input
          class="appearance-none bg-transparent w-full py-[1rem] px-[1rem] leading-tight focus:outline-none border-b-[0.5px] border-black text-black placeholder:text-black mb-[1rem]"
          type="password"
          placeholder="密碼"
          @input="handlePasswordChange"
          @blur="handlePasswordBlur"
          :value="password"
        />
        <p
          v-show="passwordMeta.touched && !passwordMeta.valid"
          class="text-red-500"
        >
          {{ passwordErrorMessage }}
        </p>
      </div>
      <button
        :class="`text-white w-full rounded-[1rem] py-[1.5rem] hover:scale-105 transition-all duration-300 ease-in-out
         ${inputState.style}`"
        type="submit"
        :disabled="inputState.status === 'loading' ? true : false"
      >
        {{ inputState.text }}
      </button>

      <p class="text-black">
        <span class="opacity-50"> 如果你註冊帳號，表示你同意我們的 </span>
        <span class="cursor-pointer">服務條款</span>
        <span class="opacity-50"> 及 </span>
        <span class="cursor-pointer">隱私政策</span>
      </p>
    </div>
  </form>

  <form
    v-else
    :class="`flex flex-col gap-[5rem] w-full px-[9.6rem] py-[6rem] transition-all duration-300 ease-in-out -translate-x-[100%] ${
      getters.inSignInForm && 'translate-x-[200%] pointer-events-none'
    }`"
    novalidate
    @submit.prevent="signUp"
  >
    <img class="w-[13.2rem]" :src="image.logo_blue" alt="logo" />

    <div class="text-black">
      <p class="text-[3.5rem] font-bold mb-[1.5rem]">註冊</p>
      <p>
        <span class="opacity-50">已經註冊了嗎？ </span>
        <span class="cursor-pointer" @click="commit('SET_FORM_TYPE_TO_SIGNIN')">
          登入
        </span>
      </p>
    </div>

    <div class="flex flex-col gap-[3rem]">
      <div>
        <input
          class="appearance-none bg-transparent w-full py-[1rem] px-[1rem] leading-tight focus:outline-none border-b-[0.5px] border-black text-black placeholder:text-black mb-[1rem]"
          type="text"
          placeholder="暱稱"
          @input="handleNameChange"
          @blur="handleNameBlur"
          :value="name"
        />
        <p v-show="nameMeta.touched && !nameMeta.valid" class="text-red-500">
          {{ nameErrorMessage }}
        </p>
      </div>

      <div>
        <input
          class="appearance-none bg-transparent w-full py-[1rem] px-[1rem] leading-tight focus:outline-none border-b-[0.5px] border-black text-black placeholder:text-black mb-[1rem]"
          type="email"
          placeholder="帳號"
          @input="handleEmailChange"
          @blur="handleEmailBlur"
          :value="email"
        />
        <p v-show="emailMeta.touched && !emailMeta.valid" class="text-red-500">
          {{ emailErrorMessage }}
        </p>
      </div>
      <div>
        <input
          class="appearance-none bg-transparent w-full py-[1rem] px-[1rem] leading-tight focus:outline-none border-b-[0.5px] border-black text-black placeholder:text-black mb-[1rem]"
          type="password"
          placeholder="密碼"
          @input="handlePasswordChange"
          @blur="handlePasswordBlur"
          :value="password"
        />
        <p
          v-show="passwordMeta.touched && !passwordMeta.valid"
          class="text-red-500"
        >
          {{ passwordErrorMessage }}
        </p>
      </div>
      <button
        :class="`text-white w-full rounded-[1rem] py-[1.5rem] hover:scale-105 transition-all duration-300 ease-in-out ${inputState.style}`"
        type="submit"
        :disabled="inputState.status === 'loading' ? true : false"
      >
        {{ inputState.text }}
      </button>

      <p class="text-black">
        <span class="opacity-50"> 如果你註冊帳號，表示你同意我們的 </span>
        <span class="cursor-pointer">服務條款</span>
        <span class="opacity-50"> 及 </span>
        <span class="cursor-pointer">隱私政策</span>
      </p>
    </div>
  </form>
</template>
