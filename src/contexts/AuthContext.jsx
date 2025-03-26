// 📁 src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import {
  auth,
  provider,
  db,
  serverTimestamp,
  rtdb,
  rtdbRef,
  rtdbSet,
  onDisconnect,
} from "../services/firebase";
import {
  onIdTokenChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { requestNotificationPermission } from "../services/fcm";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Listener garantido para usuário autenticado no Firestore + RTDB
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        await setOnlineStatus(currentUser.uid);
        setupOnDisconnect(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Atualiza status online/offline conforme foco da aba
  useEffect(() => {
    if (!user) return;

    const handleFocus = () => setOnlineStatus(user.uid);
    const handleBlur = () => setOfflineStatus(user.uid);
    const handleUnload = () => setOfflineStatus(user.uid);

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [user]);

  // ✅ Mantém status atualizado com ping a cada 10s
  useEffect(() => {
    if (!user) return;

    const statusRef = rtdbRef(rtdb, `status/${user.uid}`);
    const interval = setInterval(() => {
      rtdbSet(statusRef, {
        state: "online",
        lastChanged: Date.now(),
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [user]);

  // ✅ Permissão para notificações e integração com WebView
  useEffect(() => {
    if (user) {
      requestNotificationPermission(user.uid);
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ uid: user.uid }));
      }
    }
  }, [user]);

  // 🔄 Atualiza Firestore + RTDB com status online
  const setOnlineStatus = async (uid) => {
    const statusRef = rtdbRef(rtdb, `status/${uid}`);
    await rtdbSet(statusRef, {
      state: "online",
      lastChanged: Date.now(),
    });

    await updateDoc(doc(db, "users", uid), {
      status: "online",
      lastSeen: serverTimestamp(),
    });
  };

  // 📴 Atualiza Firestore + RTDB com status offline
  const setOfflineStatus = async (uid) => {
    const statusRef = rtdbRef(rtdb, `status/${uid}`);
    await rtdbSet(statusRef, {
      state: "offline",
      lastChanged: Date.now(),
    });

    await updateDoc(doc(db, "users", uid), {
      status: "offline",
      lastSeen: serverTimestamp(),
    });
  };

  // ✅ Define status offline automático ao desconectar
  const setupOnDisconnect = (uid) => {
    const statusRef = rtdbRef(rtdb, `status/${uid}`);
    onDisconnect(statusRef).set({
      state: "offline",
      lastChanged: Date.now(),
    });
  };

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        createdAt: serverTimestamp(),
      });
    }

    return result;
  };

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const logout = async () => {
    if (user) {
      await setOfflineStatus(user.uid);
    }
    return signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginWithGoogle,
        register,
        logout,
        resetPassword,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
