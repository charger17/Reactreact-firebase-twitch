import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCK6Nbsl2alSz8kqYAKB9EEuZnCJZ6uOOA",
  authDomain: "react-2022-36ab5.firebaseapp.com",
  projectId: "react-2022-36ab5",
  storageBucket: "react-2022-36ab5.appspot.com",
  messagingSenderId: "396274352415",
  appId: "1:396274352415:web:1c0c59c030098340a4f02a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
