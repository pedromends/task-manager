// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBes-lOP7wmnuUV-8BERI_ghYd9WzdFS0c",
  authDomain: "task-manager-c8015.firebaseapp.com",
  projectId: "task-manager-c8015",
  storageBucket: "task-manager-c8015.appspot.com",
  messagingSenderId: "17715462200",
  appId: "1:17715462200:web:ffd7f8d4f81eec4cd966cd"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export default firebase