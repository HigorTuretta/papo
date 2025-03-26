// src/services/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  serverTimestamp,
  initializeFirestore,
  persistentLocalCache,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, onMessage } from "firebase/messaging";

// 🔐 Config Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// 🔥 Inicializa
const app = initializeApp(firebaseConfig);

// 🔐 Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 🧠 Firestore
const db = initializeFirestore(app, {
  localCache: persistentLocalCache(),
  experimentalForceLongPolling: true,
});

// ☁️ Storage
const storage = getStorage(app);

// 📲 Messaging (FCM)
export const messaging = getMessaging(app);

// 🔔 Escuta notificações com o app aberto
onMessage(messaging, (payload) => {
  console.log("🔥 Notificação recebida enquanto o app estava aberto:", payload);
});

export { auth, db, storage, provider, serverTimestamp };
