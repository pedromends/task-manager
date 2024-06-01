import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

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

const functions = getFunctions(app)
connectFunctionsEmulator(functions, "localhost", 5000);
//connectFirestoreEmulator(db, 'localhost', 5000)

export default firebase
