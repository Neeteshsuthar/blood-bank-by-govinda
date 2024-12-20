import { initializeApp } from "firebase/app";
// import {  getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import { getAuth , createUserWithEmailAndPassword ,signInWithEmailAndPassword,sendPasswordResetEmail } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore,collection, getDocs } from "firebase/firestore";
import { query} from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBTwy7cm-IlzW4TKcTe4fPjGECV_Hci22k",
  authDomain: "project-2def0.firebaseapp.com",
  projectId: "project-2def0",
  storageBucket: "project-2def0.firebasestorage.app",
  messagingSenderId: "1096148945568",
  appId: "1:1096148945568:web:2be4beb0147cb4e46b57c5",
  measurementId: "G-CLQK3W9FQ9"
};

initializeApp(firebaseConfig);
const auth = getAuth()
const db =getFirestore()
const database=getDatabase()
const storage=getStorage()
export {auth,storage,db,database,ref,collection, getDocs,query, set,signInWithEmailAndPassword,sendPasswordResetEmail , createUserWithEmailAndPassword}


