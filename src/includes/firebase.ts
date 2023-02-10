// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import type { FirebaseApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
  Firestore,
  getDoc,
} from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import type { Auth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvBrjpUd2-rjtljxav6yz18fXu1avMzlo",
  authDomain: "quizler-3b6bb.firebaseapp.com",
  projectId: "quizler-3b6bb",
  storageBucket: "quizler-3b6bb.appspot.com",
  messagingSenderId: "864719546833",
  appId: "1:864719546833:web:28e95799c4992ba12a18f0",
};

// Initialize Firebase
const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

const auth: Auth = getAuth(firebaseApp);
const db: Firestore | any = getFirestore(firebaseApp);

export {
  db,
  auth,
  onAuthStateChanged,
  collection,
  query,
  where,
  getDoc,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
};
