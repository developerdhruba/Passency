import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2eo2NdzNuQTr7FqKtKOuxs_zMjPshzWY",
  authDomain: "pass-vault-61782.firebaseapp.com",
  projectId: "pass-vault-61782",
  storageBucket: "pass-vault-61782.firebasestorage.app",
  messagingSenderId: "895384475260",
  appId: "1:895384475260:web:92de42eb1355bacf1adbf9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
