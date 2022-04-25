
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCp0ul3X7VKf_bzR-E76Wu-6aVVn6p03Rk",
  authDomain: "spotify-90dc9.firebaseapp.com",
  projectId: "spotify-90dc9",
  storageBucket: "spotify-90dc9.appspot.com",
  messagingSenderId: "871407274323",
  appId: "1:871407274323:web:f71f4d1a74ea1f9d2ab9a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db;