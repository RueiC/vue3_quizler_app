import { createStore } from "vuex";
import type { State } from "../../types";

const state: State = {
  isModalOpen: false,
  inSignInForm: true,
  isShowSpinnder: false,
};

export const store = createStore({
  state,
  getters: {
    isModalOpen: (state: State): boolean => state.isModalOpen,
    inSignInForm: (state: State): boolean => state.inSignInForm,
    isShowSpinnder: (state: State): boolean => state.isShowSpinnder,
  },

  mutations: {
    OPEN_MODAL: (state: State): boolean => (state.isModalOpen = true),
    CLOSE_MODAL: (state: State): boolean => (state.isModalOpen = false),

    SET_FORM_TYPE_TO_SIGNIN: (state: State): boolean =>
      (state.inSignInForm = true),
    SET_FORM_TYPE_TO_SIGNUP: (state: State): boolean =>
      (state.inSignInForm = false),

    SHOW_SPINNER: (state: State): boolean => (state.isShowSpinnder = true),
    HIDE_SPINNER: (state: State): boolean => (state.isShowSpinnder = false),
  },
});
