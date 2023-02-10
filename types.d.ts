export type State = {
  isModalOpen: boolean;
  inSignInForm: boolean;
  isShowSpinnder: boolean;
};

export type Getters = {
  isModalOpen: () => boolean;
  inSignInForm: () => boolean;
  isShowSpinnder: () => boolean;
};

export type FlashCard = {
  id: string;
  definition: string;
  word: string;
};

interface ControlModal {
  toggle: boolean;
  id: string;
}

interface FlashcardSet {
  id: string;
  title: string;
  uid: string;
  flashcards: FlashCard[];
}
