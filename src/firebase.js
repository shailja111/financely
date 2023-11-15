import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0JDPgb-s_i_RF3xTvOsQO9YGFiDjRvI4",
  authDomain: "financely-2d654.firebaseapp.com",
  projectId: "financely-2d654",
  storageBucket: "financely-2d654.appspot.com",
  messagingSenderId: "132242881804",
  appId: "1:132242881804:web:70c445344a8d71cb9a9d29",
  measurementId: "G-W4FCLR1730",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
