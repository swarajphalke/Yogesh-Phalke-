import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFHr6__xpBLoACHn6ztHou3Hh6wv6YBNM",
  authDomain: "yogeshphalke-portfolio.firebaseapp.com",
  projectId: "yogeshphalke-portfolio",
  storageBucket: "yogeshphalke-portfolio.firebasestorage.app",
  messagingSenderId: "21763492351",
  appId: "1:21763492351:web:ebdca60dbaefb76dd73fca",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
