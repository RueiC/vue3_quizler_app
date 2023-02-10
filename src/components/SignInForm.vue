<script setup lang="ts">
import { reactive } from 'vue';
import { useStore } from 'vuex';
import type { Commit } from 'vuex';
import type { FieldMeta } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useField, useForm } from 'vee-validate';

import { auth, signInWithEmailAndPassword } from '../includes/firebase';
import image from '../assets/index';
import { schema } from '../includes/validator';

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

const router = useRouter();
const { commit, getters }: { commit: Commit; getters: any } = useStore();
const inputState = reactive({
  style: 'bg-quizler-blue-1',
  text: '登入',
  status: 'none',
});

const { handleSubmit } = useForm<Record<string, any>>({
  validationSchema: schema,
});

const {
  value: email,
  meta: emailMeta,
  errorMessage: emailErrorMessage,
  handleBlur: handleEmailBlur,
  handleChange: handleEmailChange,
} = useField<InputString>('email');

const {
  value: password,
  meta: passwordMeta,
  errorMessage: passwordErrorMessage,
  handleBlur: handlePasswordBlur,
  handleChange: handlePasswordChange,
} = useField<InputString>('password');

const signIn = handleSubmit(async (values, actions): Promise<void> => {
  inputState.style = 'bg-gray-300';
  inputState.text = '登入中';
  inputState.status = 'loading';

  try {
    await signInWithEmailAndPassword(auth, values.email, values.password);

    actions.resetForm();
    router.replace('/library');
  } catch (err) {
    console.log(err);
  }

  inputState.style = 'bg-quizler-blue-1';
  inputState.text = '登入';
  inputState.status = 'none';
});
</script>

<template>
  <form
    v-if="props.type !== 'mobile'"
    :class="`flex flex-col gap-[5rem] w-full px-[9.6rem] py-[6rem] transition-all duration-500 ease-in-out ${
      getters.inSignInForm
        ? 'opacity-100'
        : 'opacity-0 translate-x-[100%] pointer-events-none'
    }`"
    novalidate
    @submit.prevent="signIn"
  >
    <img class="w-[13.2rem]" :src="image.logo_blue" alt="logo" />

    <div class="text-black">
      <p class="text-[3.5rem] font-bold mb-[1.5rem]">歡迎回來！</p>
      <p>
        <span class="opacity-50">還沒註冊嗎？ </span>
        <span class="cursor-pointer" @click="commit('SET_FORM_TYPE_TO_SIGNUP')">
          註冊
        </span>
      </p>
    </div>

    <div v-show="getters.inSignInForm" class="flex flex-col gap-[3rem]">
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
        <span class="opacity-50">忘記你的帳號密碼嗎？ </span>
        <span class="cursor-pointer">取得協助</span>
      </p>
    </div>
  </form>

  <form
    v-else
    :class="`flex flex-col gap-[5rem] w-full px-[9.6rem] py-[6rem] transition-all duration-500 ease-in-out ${
      getters.inSignInForm
        ? 'translate-x-0'
        : 'translate-x-[100%] pointer-events-none'
    }`"
    novalidate
    @submit.prevent="signIn"
  >
    <img class="w-[13.2rem]" :src="image.logo_blue" alt="logo" />

    <div class="text-black">
      <p class="text-[3.5rem] font-bold mb-[1.5rem]">歡迎回來！</p>
      <p>
        <span class="opacity-50">還沒註冊嗎？ </span>
        <span class="cursor-pointer" @click="commit('SET_FORM_TYPE_TO_SIGNUP')">
          註冊
        </span>
      </p>
    </div>

    <div class="flex flex-col gap-[3rem]">
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
        <span class="opacity-50">忘記你的帳號密碼嗎？ </span>
        <span class="cursor-pointer">取得協助</span>
      </p>
    </div>
  </form>
</template>
