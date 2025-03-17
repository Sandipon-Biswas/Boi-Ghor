// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0biatneMEpSoRsjq29-zTLyhybaec7mw",
  authDomain: "mkboighor.firebaseapp.com",
  projectId: "mkboighor",
  storageBucket: "mkboighor.firebasestorage.app",
  messagingSenderId: "637696851312",
  appId: "1:637696851312:web:46b53e605a295dbeb663b5",
  measurementId: "G-YCWHHZSY07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }