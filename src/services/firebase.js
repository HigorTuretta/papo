// src/services/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  serverTimestamp
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MSG_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  }

  
  import { initializeFirestore, persistentLocalCache } from "firebase/firestore";

  const app = initializeApp(firebaseConfig);
  
  // Firebase Auth
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  
  // Firebase Firestore com fallback
  const db = initializeFirestore(app, {
    localCache: persistentLocalCache(),
    experimentalForceLongPolling: true, 
  });
  
  // Firebase Storage
  const storage = getStorage(app);

export { auth, db, storage, provider, serverTimestamp };
