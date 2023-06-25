import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC-cHEldnYvzaRRQWALmTqzrKBCG-oXcIk",
  authDomain: "projeto-frontend-5b308.firebaseapp.com",
  projectId: "projeto-frontend-5b308",
  storageBucket: "projeto-frontend-5b308.appspot.com",
  messagingSenderId: "955337643364",
  appId: "1:955337643364:web:a734f52bbb0bb401ac5671",
  measurementId: "G-JKL41MNXF0"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)